/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */
/* @biome-ignore-all: generated file */

import * as Types from "../../__generated__/types.ts";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";


interface DefinedFields {
  User: 'id' | 'email' | 'birthday';
  Query: 'user';
};

export type User = Pick<Types.User, DefinedFields['User']>;
export type UUID = Types.Uuid;
export type DateTime = Types.DateTime;
export type Query = Pick<Types.Query, DefinedFields['Query']>;

export namespace ModuleMetadata {
  export const id = 'user';
  export const dirname = './user';
  export const hashes = {"User":{"hash":"13v0ak","fieldsHashes":{"birthday":"1mpx1p5","email":"bsmiek","id":"7nrrls"}},"Query":{"hash":"198ob4o","fieldsHashes":{"user":"14091bp"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User","loc":{"start":5,"end":9}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":13,"end":15}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID","loc":{"start":17,"end":21}},"loc":{"start":17,"end":21}},"loc":{"start":17,"end":22}},"directives":[],"loc":{"start":13,"end":22}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"email","loc":{"start":24,"end":29}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":31,"end":37}},"loc":{"start":31,"end":37}},"loc":{"start":31,"end":38}},"directives":[],"loc":{"start":24,"end":38}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"birthday","loc":{"start":40,"end":48}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime","loc":{"start":50,"end":58}},"loc":{"start":50,"end":58}},"loc":{"start":50,"end":59}},"directives":[],"loc":{"start":40,"end":59}}],"loc":{"start":0,"end":61}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":68,"end":73}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"user","loc":{"start":77,"end":81}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":83,"end":87}},"loc":{"start":83,"end":87}},"directives":[],"loc":{"start":77,"end":87}}],"loc":{"start":63,"end":89}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      User: {
        ...module.createTypeMethods<User, Types.ContextType>("User"),
        id: module.createResolverBuilder<UUID, User, Types.ContextType, { }>("User", "id"),
        email: module.createResolverBuilder<Types.Scalars["String"]["output"], User, Types.ContextType, { }>("User", "email"),
        birthday: module.createResolverBuilder<DateTime, User, Types.ContextType, { }>("User", "birthday"),
      },
      Query: {
        ...module.createTypeMethods<{ }, Types.ContextType>("Query"),
        user: module.createResolverBuilder<Types.Maybe<User>, { }, Types.ContextType, { }>("Query", "user"),
      },
    };
  }
}

export const createUserModule = () => Baeta.createModuleManager(ModuleMetadata);
export const getUserModule = Baeta.createSingletonModule(createUserModule);
