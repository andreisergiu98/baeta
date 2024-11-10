/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import * as Types from "../../__generated__/types";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";


interface DefinedFields {
  UserPhoto: 'id' | 'url';
  User: 'photos';
};

export type UserPhoto = Pick<Types.UserPhoto, DefinedFields['UserPhoto']>;
export type User = Pick<Types.User, Types.DefinedFieldsWithoutExtensions["User"]>;

export namespace ModuleMetadata {
  export const id = 'user-photos';
  export const dirname = './user-photos';
  export const hashes = {"UserPhoto":{"hash":"3noyzl","fieldsHashes":{"id":"1ij53kg","url":"bsmiek"}},"User":{"hash":"11vpwyu","fieldsHashes":{"photos":"1ve18yx"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserPhoto","loc":{"start":5,"end":14}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":18,"end":20}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":22,"end":24}},"loc":{"start":22,"end":24}},"loc":{"start":22,"end":25}},"directives":[],"loc":{"start":18,"end":25}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url","loc":{"start":27,"end":30}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":32,"end":38}},"loc":{"start":32,"end":38}},"loc":{"start":32,"end":39}},"directives":[],"loc":{"start":27,"end":39}}],"loc":{"start":0,"end":41}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"User","loc":{"start":55,"end":59}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"photos","loc":{"start":63,"end":69}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhoto","loc":{"start":72,"end":81}},"loc":{"start":72,"end":81}},"loc":{"start":72,"end":82}},"loc":{"start":71,"end":83}},"directives":[],"loc":{"start":63,"end":83}}],"loc":{"start":43,"end":85}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      UserPhoto: {
        ...module.createTypeMethods<UserPhoto, Types.ContextType>("UserPhoto"),
        id: module.createResolverBuilder<Types.Scalars["ID"]["output"], UserPhoto, Types.ContextType, { }>("UserPhoto", "id"),
        url: module.createResolverBuilder<Types.Scalars["String"]["output"], UserPhoto, Types.ContextType, { }>("UserPhoto", "url"),
      },
      User: {
        ...module.createTypeMethods<User, Types.ContextType>("User"),
        photos: module.createResolverBuilder<Types.Maybe<Array<UserPhoto>>, User, Types.ContextType, { }>("User", "photos"),
      },
    };
  }
}

export const createUserPhotosModule = () => Baeta.createModuleManager(ModuleMetadata);
export const getUserPhotosModule = Baeta.createSingletonModule(createUserPhotosModule);
