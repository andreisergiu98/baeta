import { Middleware } from '@baeta/core';
import DataLoader from 'dataloader';
import stringify from 'fast-json-stable-stringify';
import { flatten } from 'flat';

export type Ref = string | number;

export type ParentRef = Ref | null | undefined;

export interface Options {
  ttl?: number;
}

export interface StoreOptions<Root> extends Options {
  getRef?: (root: Root) => Ref;
  version?: string;
}

export abstract class StoreAdapter<Item> {
  constructor(
    protected options: StoreOptions<Item> | undefined,
    protected type: string,
    protected hash: string,
  ) {}

  protected dataRead = new DataLoader<Ref, Item | null>(async (refs) => {
    const results = await this.loadMany(refs as Ref[]);

    if (results == null) {
      return new Array(refs.length).fill(null);
    }

    return results;
  });

  protected abstract loadMany: (refs: Ref[]) => Promise<Array<Item | null> | null>;

  get = (ref: Ref): Promise<Item | null> => {
    return this.dataRead.load(ref);
  };

  getMany = async (refs: Ref[]): Promise<Array<Item> | null> => {
    const results = await this.getMany(refs);

    if (results == null) {
      return null;
    }

    const isPartial = results.some((result) => result == null);

    if (isPartial) {
      return null;
    }

    return results as Item[];
  };

  getManyPartially = async (refs: Ref[]): Promise<Array<Item | null> | null> => {
    return Promise.all(refs.map((ref) => this.get(ref)));
  };

  abstract save: (item: Item) => Promise<void>;

  abstract saveMany: (items: Item[]) => Promise<void>;

  abstract getQueryResult: (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
  ) => Promise<Item | null>;

  abstract getQueryResults: (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
  ) => Promise<Array<Item> | null>;

  abstract saveQueryResult: (
    queryRef: string,
    parentRef: ParentRef,
    args: Record<string, unknown>,
    data: Item | Item[],
  ) => Promise<void>;

  abstract deleteOne: (ref: Ref, evictQueries?: boolean) => Promise<void>;

  abstract deleteMany: (refs: Ref[], evictQueries?: boolean) => Promise<void>;

  abstract deleteQueries: (
    queryRef?: string,
    parentRef?: NonNullable<ParentRef>,
    args?: Record<string, unknown>,
  ) => Promise<void>;

  createQueryMiddleware = <T>(
    queryRef: string,
  ): Middleware<T, any, any, Record<string, unknown>> => {
    return async (params, next): Promise<T> => {
      const cached = await this.getQueryResults(queryRef, params.root?.id, params.args);

      if (cached) {
        const isList = cached.pop() === '1';

        if (isList) {
          return cached as T;
        }

        const result = cached[0];

        if (result) {
          return result as T;
        }
      }

      const result = await next();

      if (result) {
        this.saveQueryResult(queryRef, params.root?.id, params.args, result as Item | Item[]);
      }

      return result;
    };
  };

  protected createKey(ref: Ref) {
    return `${this.type}:${this.hash}#${ref}`;
  }

  protected createKeyByItem(item: Item) {
    return this.createKey(this.getRef(item));
  }

  protected createQueryKey(queryRef: string, parentRef: ParentRef, args: Record<string, unknown>) {
    return `${this.createQueryKeyNamespace(queryRef)}:${this.serializeQueryKeyMeta(
      parentRef,
      args,
    )}`;
  }

  protected serializeQueryKeyMeta(parentRef: ParentRef, args: Record<string, unknown>) {
    const normalizedArgs = this.normalizeQueryArgs(args);
    const normalizedParentRef = this.normalizeQueryParentRef(parentRef);
    const serialized = `["${normalizedParentRef}",${stringify(normalizedArgs)}]`;
    return serialized;
  }

  protected createQueryKeyRegExpMatcher(
    queryRef: string,
    parentRef: NonNullable<ParentRef>,
    args: Record<string, unknown>,
  ) {
    const serializedArgs = stringify(this.normalizeQueryArgs(args));
    const serializedParentRef = this.normalizeQueryParentRef(parentRef);

    const innerArgs = serializedArgs.slice(1, -1);

    const queryRefPattern = queryRef === '*' ? '.*' : this.escapeRegExpCharacters(queryRef);
    const parentRefPattern =
      serializedParentRef === '*' ? '.*' : this.escapeRegExpCharacters(serializedParentRef);

    const escapedNamespace = this.escapeRegExpCharacters(this.createQueryKeyNamespace(''));
    const escapedInnerArgs = this.escapeRegExpCharacters(innerArgs);

    const argsMatcher = `\\{.*${escapedInnerArgs}.*\\}`;

    const pattern = `^${escapedNamespace}${queryRefPattern}:${parentRefPattern}:${argsMatcher}$`;

    return new RegExp(pattern);
  }

  protected createQueryKeyGlobMatcher(
    queryRef: string,
    parentRef: NonNullable<ParentRef>,
    args: Record<string, unknown>,
  ) {
    const serializedArgs = stringify(this.normalizeQueryArgs(args));
    const serializedParentRef = this.normalizeQueryParentRef(parentRef);

    const innerArgs = serializedArgs.slice(1, serializedArgs.length - 2);

    const escapedNamespace = this.escapeGlobCharacters(this.createQueryKeyNamespace(queryRef));
    const escapedInnerArgs = this.escapeGlobCharacters(innerArgs);

    const argsMatcher = `\\{*${escapedInnerArgs}*\\}`;

    const metaMatcher = `\\[\\"${serializedParentRef}\\"\\,${argsMatcher}\\]\\`;

    return `${escapedNamespace}\\:${metaMatcher}`;
  }

  protected createQueryKeyNamespace(ref: string) {
    return `${this.type}:${this.hash}:query:${ref}`;
  }

  protected normalizeQueryParentRef(parentRef: ParentRef) {
    return this.normalizePrimitive(parentRef);
  }

  protected normalizeQueryArgs(args: Record<string, unknown>) {
    const normalized = flatten(args) as Record<string, string | boolean | null>;

    for (const key in normalized) {
      normalized[key] = this.normalizePrimitive(normalized[key]);
    }

    return normalized;
  }

  protected normalizePrimitive(value: string | number | boolean | null | undefined) {
    if (value == null) {
      return 'null';
    }
    // We add underscore to avoid collisions with the 'null' from above
    return `_${value.toString()}`;
  }

  protected getRef(root: Item): Ref {
    if (this.options?.getRef) {
      return this.options.getRef(root);
    }

    if (root == null) {
      throw new Error('Object does not have id. Define getRef function in cache options');
    }

    if (typeof root === 'object' && 'id' in root) {
      if (typeof root.id !== 'string' && typeof root.id !== 'number') {
        throw new Error(
          'Object id must be string or number. Define getRef function in cache options',
        );
      }

      return root.id;
    }

    throw new Error('Object does not have id. Define getRef function in cache options');
  }

  protected escapeRegExpCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  protected escapeGlobCharacters(value: string) {
    const replacements: Record<string, string | undefined> = {
      ',': '\\,',
      '.': '\\.',
      '<': '\\<',
      '>': '\\>',
      '{': '\\{',
      '}': '\\}',
      '[': '\\[',
      ']': '\\]',
      '"': '\\"',
      "'": "\\'",
      ':': '\\:',
      ';': '\\;',
      '!': '\\!',
      '@': '\\@',
      '#': '\\#',
      $: '\\$',
      '%': '\\%',
      '^': '\\^',
      '&': '\\&',
      '*': '\\*',
      '(': '\\(',
      ')': '\\)',
      '-': '\\-',
      '+': '\\+',
      '=': '\\=',
      '~': '\\~',
    };

    const newValue = value.replace(
      /,|\.|<|>|\{|\}|\[|\]|"|'|:|;|!|@|#|\$|%|\^|&|\*|\(|\)|-|\+|=|~/g,
      (x) => {
        return replacements[x] || x;
      },
    );
    return newValue;
  }
}
