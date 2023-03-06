import {
  AsyncClient,
  IClientPublishOptions,
  IClientSubscribeOptions,
  ISubscriptionGrant,
} from 'async-mqtt';
import { PubSubEngine } from 'graphql-subscriptions';
import { PubSubAsyncIterator } from './async-iterator';

export interface PubSubMQTTOptions {
  createClient: () => Promise<AsyncClient>;
  publishOptions?: PublishOptionsResolver;
  subscribeOptions?: SubscribeOptionsResolver;
  onMQTTSubscribe?: (id: number, granted: ISubscriptionGrant[]) => void;
  triggerTransform?: TriggerTransform;
  parseMessageWithEncoding?: string;
}

export type Path = Array<string | number>;

export type Trigger = string | Path;

export type TriggerTransform = (trigger: Trigger, channelOptions?: Object) => string;

export type SubscribeOptionsResolver = (
  trigger: Trigger,
  channelOptions?: Object
) => Promise<IClientSubscribeOptions>;

export type PublishOptionsResolver = (
  trigger: Trigger,
  payload: any
) => Promise<IClientPublishOptions>;

export type SubscribeHandler = (id: number, granted: ISubscriptionGrant[]) => void;

export class MQTTPubSub implements PubSubEngine {
  private listening = false;
  private mqttConnection: AsyncClient | undefined;
  private currentSubscriptionId = 0;
  private subscriptionMap: Record<number, [string, Function] | undefined> = {};
  private subsRefsMap: Record<string, Array<number> | undefined> = {};

  private createClient: () => Promise<AsyncClient>;

  constructor(options: PubSubMQTTOptions) {
    this.createClient = options.createClient;
  }

  async publish(trigger: string, payload: unknown) {
    await fetch('http://127.0.0.1:1445/api/v4/mqtt/publish', {
      method: 'POST',
      body: JSON.stringify({
        topic: trigger,
        clientid: '2',
        payload: JSON.stringify(payload),
        encoding: 'plain',
        qos: 1,
      }),
      headers: {
        Authorization: `Basic ${btoa('nanomq:nanomq_server_password')}`,
      },
    });
  }

  async subscribe(trigger: string, onMessage: Function, options: Object): Promise<number> {
    if (this.listening === false) {
      await this.listen();
    }

    const id = this.currentSubscriptionId++;
    this.subscriptionMap[id] = [trigger, onMessage];

    let refs = this.subsRefsMap[trigger];

    if (refs && refs.length > 0) {
      this.subsRefsMap[trigger] = [...refs, id];
      return id;
    }

    const client = await this.getClient();
    await client.subscribe(trigger, { qos: 1 });

    refs = this.subsRefsMap[trigger] ?? [];
    this.subsRefsMap[trigger] = [...refs, id];

    return id;
  }

  async unsubscribe(subId: number) {
    const [triggerName = null] = this.subscriptionMap[subId] || [];

    if (triggerName == null) {
      throw new Error(`There is no subscription of id "${subId}"`);
    }

    const refs = this.subsRefsMap[triggerName];

    if (refs == null) {
      throw new Error(`There is no subscription of id "${subId}"`);
    }

    if (refs.length === 1) {
      this.subscriptionMap[subId] = undefined;
      this.subsRefsMap[triggerName] = [];
      const client = await this.getClient();
      return client.unsubscribe(triggerName);
    }

    const index = refs.indexOf(subId);
    this.subsRefsMap[triggerName] = [...refs.slice(0, index), ...refs.slice(index + 1)];
  }

  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T, any, undefined> {
    return new PubSubAsyncIterator(this, triggers);
  }

  private async getClient() {
    if (!this.mqttConnection) {
      this.mqttConnection = await this.createClient();
    }

    if (!(this.mqttConnection.connected || this.mqttConnection.reconnecting)) {
      return this.mqttConnection.reconnect();
    }

    return this.mqttConnection;
  }

  private async listen() {
    this.listening = true;
    const client = await this.getClient();
    client.on('message', this.onMessage);
  }

  private static matches(pattern: string, topic: string) {
    const patternSegments = pattern.split('/');
    const topicSegments = topic.split('/');
    const patternLength = patternSegments.length;

    for (let i = 0; i < patternLength; i++) {
      const currentPattern = patternSegments[i];
      const currentTopic = topicSegments[i];
      if (!(currentTopic || currentPattern)) {
        continue;
      }
      if (!currentTopic && currentPattern !== '#') {
        return false;
      }
      if (currentPattern[0] === '#') {
        return i === patternLength - 1;
      }
      if (currentPattern[0] !== '+' && currentPattern !== currentTopic) {
        return false;
      }
    }
    return patternLength === topicSegments.length;
  }

  private onMessage = (topic: string, message: Uint8Array) => {
    const matchedKeys = [...Object.keys(this.subsRefsMap)].filter((key) =>
      MQTTPubSub.matches(key, topic)
    );
    const subscribers = matchedKeys.map((key) => this.subsRefsMap[key]).flat(2) as number[];

    if (!subscribers.length) {
      return;
    }

    const messageString = new TextDecoder().decode(message);
    let parsedMessage;

    try {
      parsedMessage = JSON.parse(messageString);
    } catch (e) {
      parsedMessage = messageString;
    }

    for (const subId of subscribers) {
      const subscription = this.subscriptionMap[subId];
      if (!subscription) {
        continue;
      }

      const listener = subscription[1];
      listener(parsedMessage);
    }
  };
}
