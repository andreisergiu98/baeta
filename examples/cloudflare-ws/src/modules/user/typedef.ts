/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import * as Types from "../../__generated__/types.ts";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";


interface DefinedFields {
  User: 'id' | 'email' | 'lastName' | 'profile' | 'givenName';
  Query: 'user' | 'users';
  Mutation: 'updateUser';
  Subscription: 'userUpdated';
};

interface DefinedInputFields {
  UserWhereUniqueInput: 'id';
  UserUpdateInput: 'lastName' | 'profile' | 'givenName';
};

export type User = Pick<Types.User, DefinedFields['User']>;
export type UserWhereUniqueInput = Pick<Types.UserWhereUniqueInput, DefinedInputFields['UserWhereUniqueInput']>;
export type UserUpdateInput = Pick<Types.UserUpdateInput, DefinedInputFields['UserUpdateInput']>;
export type Query = Pick<Types.Query, DefinedFields['Query']>;
export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
export type Subscription = Pick<Types.Subscription, DefinedFields['Subscription']>;

export namespace ModuleMetadata {
  export const id = 'user';
  export const dirname = './user';
  export const hashes = {"User":{"hash":"1hbls86","fieldsHashes":{"email":"bsmiek","givenName":"1rdse78","id":"1ij53kg","lastName":"bsmiek","profile":"1rdse78"}},"Query":{"hash":"1dqods2","fieldsHashes":{"user":"14091bp","users":"1v4huu5"}},"Mutation":{"hash":"ztkopb","fieldsHashes":{"updateUser":"14091bp"}},"Subscription":{"hash":"m0nrky","fieldsHashes":{"userUpdated":"14091bp"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User","loc":{"start":5,"end":9}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":13,"end":15}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":17,"end":19}},"loc":{"start":17,"end":19}},"loc":{"start":17,"end":20}},"directives":[],"loc":{"start":13,"end":20}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"email","loc":{"start":22,"end":27}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":29,"end":35}},"loc":{"start":29,"end":35}},"loc":{"start":29,"end":36}},"directives":[],"loc":{"start":22,"end":36}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"lastName","loc":{"start":38,"end":46}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":48,"end":54}},"loc":{"start":48,"end":54}},"loc":{"start":48,"end":55}},"directives":[],"loc":{"start":38,"end":55}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"profile","loc":{"start":57,"end":64}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":66,"end":72}},"loc":{"start":66,"end":72}},"directives":[],"loc":{"start":57,"end":72}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"givenName","loc":{"start":74,"end":83}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":85,"end":91}},"loc":{"start":85,"end":91}},"directives":[],"loc":{"start":74,"end":91}}],"loc":{"start":0,"end":93}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UserWhereUniqueInput","loc":{"start":101,"end":121}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":125,"end":127}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":129,"end":131}},"loc":{"start":129,"end":131}},"loc":{"start":129,"end":132}},"directives":[],"loc":{"start":125,"end":132}}],"loc":{"start":95,"end":134}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UserUpdateInput","loc":{"start":142,"end":157}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"lastName","loc":{"start":161,"end":169}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":171,"end":177}},"loc":{"start":171,"end":177}},"directives":[],"loc":{"start":161,"end":177}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"profile","loc":{"start":179,"end":186}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":188,"end":194}},"loc":{"start":188,"end":194}},"directives":[],"loc":{"start":179,"end":194}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"givenName","loc":{"start":196,"end":205}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":207,"end":213}},"loc":{"start":207,"end":213}},"directives":[],"loc":{"start":196,"end":213}}],"loc":{"start":136,"end":215}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":222,"end":227}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"user","loc":{"start":231,"end":235}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where","loc":{"start":236,"end":241}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput","loc":{"start":243,"end":263}},"loc":{"start":243,"end":263}},"loc":{"start":243,"end":264}},"directives":[],"loc":{"start":236,"end":264}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":267,"end":271}},"loc":{"start":267,"end":271}},"directives":[],"loc":{"start":231,"end":271}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"users","loc":{"start":273,"end":278}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":281,"end":285}},"loc":{"start":281,"end":285}},"loc":{"start":281,"end":286}},"loc":{"start":280,"end":287}},"directives":[],"loc":{"start":273,"end":287}}],"loc":{"start":217,"end":289}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation","loc":{"start":296,"end":304}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateUser","loc":{"start":308,"end":318}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where","loc":{"start":319,"end":324}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput","loc":{"start":326,"end":346}},"loc":{"start":326,"end":346}},"loc":{"start":326,"end":347}},"directives":[],"loc":{"start":319,"end":347}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data","loc":{"start":349,"end":353}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput","loc":{"start":355,"end":370}},"loc":{"start":355,"end":370}},"loc":{"start":355,"end":371}},"directives":[],"loc":{"start":349,"end":371}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":374,"end":378}},"loc":{"start":374,"end":378}},"directives":[],"loc":{"start":308,"end":378}}],"loc":{"start":291,"end":380}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Subscription","loc":{"start":387,"end":399}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"userUpdated","loc":{"start":403,"end":414}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":416,"end":420}},"loc":{"start":416,"end":420}},"directives":[],"loc":{"start":403,"end":420}}],"loc":{"start":382,"end":422}}]} as unknown as DocumentNode;
  
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
        user: module.createResolverBuilder<Types.Maybe<User>, { }, Types.ContextType, Types.QueryUserArgs>("Query", "user"),
        users: module.createResolverBuilder<Types.Maybe<Array<User>>, { }, Types.ContextType, { }>("Query", "users"),
      },
      Mutation: {
        ...module.createTypeMethods<{ }, Types.ContextType>("Mutation"),
        updateUser: module.createResolverBuilder<Types.Maybe<User>, { }, Types.ContextType, Types.MutationUpdateUserArgs>("Mutation", "updateUser"),
      },
      Subscription: {
        ...module.createSubscriptionMethods<{ }, Types.ContextType>(),
        userUpdated: module.createSubscriptionBuilder<Types.Maybe<User>, { }, Types.ContextType, { }>("userUpdated"),
      },
    };
  }
}

export const createUserModule = () => Baeta.createModuleManager(ModuleMetadata);
export const getUserModule = Baeta.createSingletonModule(createUserModule);
