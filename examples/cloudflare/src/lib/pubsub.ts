import { connectAsync } from 'async-mqtt';
import { PubSubEngine } from 'graphql-subscriptions';
import { MQTTPubSub } from './mqtt-pub-sub';

let pubsub: MQTTPubSub | undefined;

export function createClient() {
  return connectAsync('ws://127.0.0.1:8083/mqtt', {
    keepalive: 30,
    resubscribe: true,
    clientId: '1',
    protocolId: 'MQTT',
    protocolVersion: 4,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    clean: true,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  });
}

export function getPubsub() {
  if (pubsub) {
    return pubsub;
  }
  pubsub = new MQTTPubSub({ createClient });
  return pubsub;
}

export function createPubSubWrapper(execCtx: ExecutionContext): PubSubEngine {
  return {
    async publish(target: string, payload: unknown) {
      const pubsub = getPubsub();
      const promise = pubsub.publish(target, payload);
      execCtx.waitUntil(promise);
      return promise;
    },
    asyncIterator<T>(triggers: string | string[]) {
      const pubsub = getPubsub();
      return pubsub.asyncIterator<T>(triggers);
    },
    unsubscribe(subId: number) {
      const pubsub = getPubsub();
      return pubsub.unsubscribe(subId);
    },
    subscribe(trigger: string, onMessage: Function, options: Object) {
      const pubsub = getPubsub();
      return pubsub.subscribe(trigger, onMessage, options);
    },
  };
}
