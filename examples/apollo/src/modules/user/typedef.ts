/* This file was generated by baeta. Do not edit it directly. */

/* eslint-disable */
/* prettier-ignore */

import * as Types from "../../__generated__/types";
import { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";


interface DefinedFields {
  User: 'id' | 'name' | 'birthday';
  Query: 'user';
};

export type User = Pick<Types.User, DefinedFields['User']>;
export type DateTime = Types.DateTime;
export type Query = Pick<Types.Query, DefinedFields['Query']>;

export namespace ModuleMetadata {
  export const id = 'user';
  export const dirname = './user';
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User","loc":{"start":5,"end":9}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":14,"end":16}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":18,"end":20}},"loc":{"start":18,"end":20}},"loc":{"start":18,"end":21}},"directives":[],"loc":{"start":14,"end":21}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name","loc":{"start":24,"end":28}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":30,"end":36}},"loc":{"start":30,"end":36}},"loc":{"start":30,"end":37}},"directives":[],"loc":{"start":24,"end":37}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"birthday","loc":{"start":40,"end":48}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime","loc":{"start":50,"end":58}},"loc":{"start":50,"end":58}},"directives":[],"loc":{"start":40,"end":58}}],"loc":{"start":0,"end":60}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":67,"end":72}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"user","loc":{"start":77,"end":81}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":82,"end":84}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":86,"end":88}},"loc":{"start":86,"end":88}},"loc":{"start":86,"end":89}},"directives":[],"loc":{"start":82,"end":89}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":92,"end":96}},"loc":{"start":92,"end":96}},"directives":[],"loc":{"start":77,"end":96}}],"loc":{"start":62,"end":98}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      User: {
        ...module.createTypeMethods<User, Types.ContextType>("User"),
        id: module.createResolverBuilder<Types.Scalars["ID"], User, Types.ContextType, {}>("User", "id"),
        name: module.createResolverBuilder<Types.Scalars["String"], User, Types.ContextType, {}>("User", "name"),
        birthday: module.createResolverBuilder<Types.Maybe<DateTime>, User, Types.ContextType, {}>("User", "birthday"),
      },
      Query: {
        ...module.createTypeMethods<{}, Types.ContextType>("Query"),
        user: module.createResolverBuilder<Types.Maybe<User>, {}, Types.ContextType, Types.QueryUserArgs>("Query", "user"),
      },
    };
  }
}

export const createUserModule = () => Baeta.createModuleManager(ModuleMetadata);
export const getUserModule = Baeta.createSingletonModule(createUserModule);
