/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import * as Types from "../../__generated__/types.ts";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";


interface DefinedFields {
  User: 'id' | 'email' | 'lastName' | 'profile' | 'givenName';
  Query: 'me' | 'user' | 'users';
};

interface DefinedInputFields {
  UserWhereUniqueInput: 'id';
};

export type User = Pick<Types.User, DefinedFields['User']>;
export type UserWhereUniqueInput = Pick<Types.UserWhereUniqueInput, DefinedInputFields['UserWhereUniqueInput']>;
export type Query = Pick<Types.Query, DefinedFields['Query']>;

export namespace ModuleMetadata {
  export const id = 'user';
  export const dirname = './user';
  export const hashes = {"User":{"hash":"1hbls86","fieldsHashes":{"email":"bsmiek","givenName":"1rdse78","id":"1ij53kg","lastName":"bsmiek","profile":"1rdse78"}},"Query":{"hash":"5o2ih7","fieldsHashes":{"me":"1k49b2f","user":"14091bp","users":"1v4huu5"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User","loc":{"start":5,"end":9}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":13,"end":15}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":17,"end":19}},"loc":{"start":17,"end":19}},"loc":{"start":17,"end":20}},"directives":[],"loc":{"start":13,"end":20}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"email","loc":{"start":22,"end":27}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":29,"end":35}},"loc":{"start":29,"end":35}},"loc":{"start":29,"end":36}},"directives":[],"loc":{"start":22,"end":36}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"lastName","loc":{"start":38,"end":46}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":48,"end":54}},"loc":{"start":48,"end":54}},"loc":{"start":48,"end":55}},"directives":[],"loc":{"start":38,"end":55}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"profile","loc":{"start":57,"end":64}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":66,"end":72}},"loc":{"start":66,"end":72}},"directives":[],"loc":{"start":57,"end":72}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"givenName","loc":{"start":74,"end":83}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":85,"end":91}},"loc":{"start":85,"end":91}},"directives":[],"loc":{"start":74,"end":91}}],"loc":{"start":0,"end":93}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UserWhereUniqueInput","loc":{"start":101,"end":121}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":125,"end":127}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":129,"end":131}},"loc":{"start":129,"end":131}},"loc":{"start":129,"end":132}},"directives":[],"loc":{"start":125,"end":132}}],"loc":{"start":95,"end":134}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":141,"end":146}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"me","loc":{"start":150,"end":152}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":154,"end":158}},"loc":{"start":154,"end":158}},"loc":{"start":154,"end":159}},"directives":[],"loc":{"start":150,"end":159}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"user","loc":{"start":161,"end":165}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where","loc":{"start":166,"end":171}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput","loc":{"start":173,"end":193}},"loc":{"start":173,"end":193}},"loc":{"start":173,"end":194}},"directives":[],"loc":{"start":166,"end":194}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":197,"end":201}},"loc":{"start":197,"end":201}},"directives":[],"loc":{"start":161,"end":201}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"users","loc":{"start":203,"end":208}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":211,"end":215}},"loc":{"start":211,"end":215}},"loc":{"start":211,"end":216}},"loc":{"start":210,"end":217}},"directives":[],"loc":{"start":203,"end":217}}],"loc":{"start":136,"end":219}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      User: {
        ...module.createTypeMethods<User, Types.ContextType>("User"),
        id: module.createResolverBuilder<Types.Scalars["ID"]["output"], User, Types.ContextType, { }>("User", "id"),
        email: module.createResolverBuilder<Types.Scalars["String"]["output"], User, Types.ContextType, { }>("User", "email"),
        lastName: module.createResolverBuilder<Types.Scalars["String"]["output"], User, Types.ContextType, { }>("User", "lastName"),
        profile: module.createResolverBuilder<Types.Maybe<Types.Scalars["String"]["output"]>, User, Types.ContextType, { }>("User", "profile"),
        givenName: module.createResolverBuilder<Types.Maybe<Types.Scalars["String"]["output"]>, User, Types.ContextType, { }>("User", "givenName"),
      },
      Query: {
        ...module.createTypeMethods<{ }, Types.ContextType>("Query"),
        me: module.createResolverBuilder<User, { }, Types.ContextType, { }>("Query", "me"),
        user: module.createResolverBuilder<Types.Maybe<User>, { }, Types.ContextType, Types.QueryUserArgs>("Query", "user"),
        users: module.createResolverBuilder<Types.Maybe<Array<User>>, { }, Types.ContextType, { }>("Query", "users"),
      },
    };
  }
}

export const createUserModule = () => Baeta.createModuleManager(ModuleMetadata);
export const getUserModule = Baeta.createSingletonModule(createUserModule);
