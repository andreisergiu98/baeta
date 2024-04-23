import { DurableObject, DurableObjectState, Request, Response } from '@cloudflare/workers-types';

export type GetAction = {
  type: 'get';
  keys: string[];
};

export type PutAction = {
  type: 'put';
  values: [string, string][];
  ttl?: number;
};

export type ListAction = {
  type: 'list';
  prefix: string;
  startAfter?: string;
  limit?: number;
};

export type DeleteAction = {
  type: 'delete';
  keys: string[];
};

export type Action = GetAction | PutAction | ListAction | DeleteAction;

export type CacheValue = {
  value: string;
  expireAt?: number;
};

export class BaetaCache implements DurableObject {
  constructor(
    public state: DurableObjectState,
    public env: {},
  ) {}

  async fetch(request: Request) {
    const json = await request.json();
    const body = json as Action;

    if (body.type === 'get') {
      const result = await this.get(body.keys);
      return new Response(result, { status: 200 });
    }

    if (body.type === 'put') {
      const result = await this.put(body.values, body.ttl);
      return new Response(result, { status: 200 });
    }

    if (body.type === 'list') {
      const result = await this.list(body.prefix, body.startAfter, body.limit);
      return new Response(result, { status: 200 });
    }

    if (body.type === 'delete') {
      const result = await this.delete(body.keys);
      return new Response(result, { status: 200 });
    }

    throw new Error('bad_request');
  }

  get = async (keys: string[]) => {
    const map = await this.state.storage.get<CacheValue>(keys, {
      allowConcurrency: true,
    });
    const values = keys.map((key) => map.get(key)?.value ?? null);
    return JSON.stringify(values);
  };

  put = async (values: [string, string][], ttl?: number) => {
    const entries: Record<string, CacheValue> = {};
    const expireAt = ttl ? Date.now() + ttl * 1000 : undefined;

    for (const [key, value] of values) {
      entries[key] = {
        value,
        expireAt,
      };
    }

    if (expireAt) {
      await this.scheduledEviction(expireAt);
    }

    await this.state.storage.put<CacheValue>(entries);
    return null;
  };

  list = async (prefix: string, startAfter?: string, limit?: number) => {
    const keys = await this.state.storage.list({
      prefix,
      startAfter,
      limit,
      allowConcurrency: true,
    });
    return JSON.stringify(Object.keys(keys));
  };

  delete = async (keys: string[]) => {
    await this.state.storage.delete(keys);
    return null;
  };

  handleEviction = async () => {
    const now = Date.now();
    const limit = 1000;
    const expiredKeys: string[] = [];

    let counter = limit;
    let startAfter: string | undefined;
    let earliestExpiry: number | undefined;

    while (counter < limit) {
      const map = await this.state.storage.list<CacheValue>({
        limit,
        allowConcurrency: true,
        startAfter,
      });

      counter = map.size;

      for await (const [key, value] of map.entries()) {
        startAfter = key;

        if (!value.expireAt) {
          continue;
        }

        if (value.expireAt < now) {
          expiredKeys.push(key);
        } else if (earliestExpiry === undefined || value.expireAt < earliestExpiry) {
          earliestExpiry = value.expireAt;
        }
      }
    }

    if (earliestExpiry) {
      await this.scheduledEviction(earliestExpiry);
    }

    if (expiredKeys.length > 0) {
      await this.state.storage.delete(expiredKeys);
    }
  };

  scheduledEviction = async (at: number) => {
    const alarm = await this.state.storage.getAlarm();
    if (alarm && alarm < at) {
      return;
    }
    await this.state.storage.deleteAlarm();
    await this.state.storage.setAlarm(at);
  };

  alarm = async () => {
    await this.handleEviction();
  };
}
