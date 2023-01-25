import { createExtensions } from '@baeta/core';
import { authExtension } from '@baeta/extension-auth';
import { Context } from './types/context';

declare global {
  export namespace AuthExtension {
    export interface Scopes {
      isPublic: boolean;
      isLoggedIn: boolean;
    }
  }
}

const auth = authExtension<Context>((ctx) => ({
  isPublic: ctx.userId == null,
  isLoggedIn: ctx.userId != null,
}));

export default createExtensions(auth);
