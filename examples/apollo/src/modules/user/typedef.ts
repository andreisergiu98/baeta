/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import * as Types from "../../__generated__/types";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";
import baetaExtensions from "../../extensions/index.ts";


interface DefinedFields {
  User: 'pid' | 'name' | 'birthday';
  Query: 'user' | 'users';
};

interface DefinedInputFields {
  UserWhereUnique: 'id' | 'email';
};

export type User = Pick<Types.User, DefinedFields['User']>;
export type DateTime = Types.DateTime;
export type UserWhereUnique = Pick<Types.UserWhereUnique, DefinedInputFields['UserWhereUnique']>;
export type Query = Pick<Types.Query, DefinedFields['Query']>;

export namespace ModuleMetadata {
  export const id = 'user';
  export const dirname = './user';
  export const hashes = {"User":{"hash":"w6b38d","fieldsHashes":{"birthday":"cxy3c1","name":"bsmiek","pid":"1ij53kg"}},"Query":{"hash":"13yhojt","fieldsHashes":{"user":"14091bp","users":"3agid2"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User","loc":{"start":5,"end":9}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pid","loc":{"start":13,"end":16}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":18,"end":20}},"loc":{"start":18,"end":20}},"loc":{"start":18,"end":21}},"directives":[],"loc":{"start":13,"end":21}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name","loc":{"start":23,"end":27}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":29,"end":35}},"loc":{"start":29,"end":35}},"loc":{"start":29,"end":36}},"directives":[],"loc":{"start":23,"end":36}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"birthday","loc":{"start":38,"end":46}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime","loc":{"start":48,"end":56}},"loc":{"start":48,"end":56}},"directives":[],"loc":{"start":38,"end":56}}],"loc":{"start":0,"end":58}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UserWhereUnique","loc":{"start":66,"end":81}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"constraints","loc":{"start":83,"end":94}},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"minFields","loc":{"start":95,"end":104}},"value":{"kind":"IntValue","value":"1","loc":{"start":106,"end":107}},"loc":{"start":95,"end":107}},{"kind":"Argument","name":{"kind":"Name","value":"maxFields","loc":{"start":109,"end":118}},"value":{"kind":"IntValue","value":"1","loc":{"start":120,"end":121}},"loc":{"start":109,"end":121}}],"loc":{"start":82,"end":122}}],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":126,"end":128}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":130,"end":132}},"loc":{"start":130,"end":132}},"directives":[],"loc":{"start":126,"end":132}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email","loc":{"start":134,"end":139}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":141,"end":147}},"loc":{"start":141,"end":147}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"trim","loc":{"start":149,"end":153}},"arguments":[],"loc":{"start":148,"end":153}},{"kind":"Directive","name":{"kind":"Name","value":"lower","loc":{"start":155,"end":160}},"arguments":[],"loc":{"start":154,"end":160}},{"kind":"Directive","name":{"kind":"Name","value":"validString","loc":{"start":162,"end":173}},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format","loc":{"start":174,"end":180}},"value":{"kind":"EnumValue","value":"EMAIL","loc":{"start":182,"end":187}},"loc":{"start":174,"end":187}}],"loc":{"start":161,"end":188}}],"loc":{"start":134,"end":188}}],"loc":{"start":60,"end":190}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":197,"end":202}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"user","loc":{"start":206,"end":210}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where","loc":{"start":211,"end":216}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUnique","loc":{"start":218,"end":233}},"loc":{"start":218,"end":233}},"directives":[],"loc":{"start":211,"end":233}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":236,"end":240}},"loc":{"start":236,"end":240}},"directives":[],"loc":{"start":206,"end":240}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"users","loc":{"start":242,"end":247}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":248,"end":250}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":252,"end":258}},"loc":{"start":252,"end":258}},"directives":[],"loc":{"start":248,"end":258}}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":262,"end":266}},"loc":{"start":262,"end":266}},"loc":{"start":261,"end":267}},"directives":[],"loc":{"start":242,"end":267}}],"loc":{"start":192,"end":269}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      User: {
        ...module.createTypeMethods<User, Types.ContextType>("User"),
        pid: module.createResolverBuilder<Types.Scalars["ID"]["output"], User, Types.ContextType, { }>("User", "pid"),
        name: module.createResolverBuilder<Types.Scalars["String"]["output"], User, Types.ContextType, { }>("User", "name"),
        birthday: module.createResolverBuilder<Types.Maybe<DateTime>, User, Types.ContextType, { }>("User", "birthday"),
      },
      Query: {
        ...module.createTypeMethods<{ }, Types.ContextType>("Query"),
        user: module.createResolverBuilder<Types.Maybe<User>, { }, Types.ContextType, Types.QueryUserArgs>("Query", "user"),
        users: module.createResolverBuilder<Types.Maybe<Array<Types.Maybe<User>>>, { }, Types.ContextType, Types.QueryUsersArgs>("Query", "users"),
      },
    };
  }
}

export const createUserModule = () => Baeta.createModuleManager(ModuleMetadata, baetaExtensions);
export const getUserModule = Baeta.createSingletonModule(createUserModule);
