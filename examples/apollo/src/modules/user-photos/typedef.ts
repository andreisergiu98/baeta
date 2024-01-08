/* This file was generated by baeta. Do not edit it directly. */

/* eslint-disable */

import * as Types from "../../__generated__/types";
import { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";
import baetaExtensions from "../../extensions";


interface DefinedFields {
  UserPhoto: 'id' | 'url';
  User: 'photos' | 'photosConnection';
};

export type UserPhoto = Pick<Types.UserPhoto, DefinedFields['UserPhoto']>;
export type User = Pick<Types.User, Types.DefinedFieldsWithoutExtensions["User"]>;
export type UserPhotoConnection = Pick<Types.UserPhotoConnection, Types.DefinedFieldsWithoutExtensions["UserPhotoConnection"]>;

export namespace ModuleMetadata {
  export const id = 'user-photos';
  export const dirname = './user-photos';
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserPhoto","loc":{"start":5,"end":14}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":19,"end":21}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":23,"end":25}},"loc":{"start":23,"end":25}},"loc":{"start":23,"end":26}},"directives":[],"loc":{"start":19,"end":26}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url","loc":{"start":29,"end":32}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":34,"end":40}},"loc":{"start":34,"end":40}},"loc":{"start":34,"end":41}},"directives":[],"loc":{"start":29,"end":41}}],"loc":{"start":0,"end":43}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"User","loc":{"start":57,"end":61}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"photos","loc":{"start":66,"end":72}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhoto","loc":{"start":75,"end":84}},"loc":{"start":75,"end":84}},"loc":{"start":75,"end":85}},"loc":{"start":74,"end":86}},"directives":[],"loc":{"start":66,"end":86}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"photosConnection","loc":{"start":89,"end":105}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhotoConnection","loc":{"start":107,"end":126}},"loc":{"start":107,"end":126}},"directives":[],"loc":{"start":89,"end":126}}],"loc":{"start":45,"end":128}},{"kind":"ScalarTypeDefinition","name":{"kind":"Name","value":"DateTime","loc":{"start":137,"end":145}},"directives":[],"loc":{"start":130,"end":145}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      UserPhoto: {
        ...module.createTypeMethods<UserPhoto, Types.ContextType>("UserPhoto"),
        id: module.createResolverBuilder<Types.Scalars["ID"]["output"], UserPhoto, Types.ContextType, {}>("UserPhoto", "id"),
        url: module.createResolverBuilder<Types.Scalars["String"]["output"], UserPhoto, Types.ContextType, {}>("UserPhoto", "url"),
      },
      User: {
        ...module.createTypeMethods<User, Types.ContextType>("User"),
        photos: module.createResolverBuilder<Types.Maybe<Array<UserPhoto>>, User, Types.ContextType, {}>("User", "photos"),
        photosConnection: module.createResolverBuilder<Types.Maybe<UserPhotoConnection>, User, Types.ContextType, {}>("User", "photosConnection"),
      },
      Scalar: {
        DateTime: module.createScalarBuilder("DateTime"),
      },
    };
  }
}

export const createUserPhotosModule = () => Baeta.createModuleManager(ModuleMetadata, baetaExtensions);
export const getUserPhotosModule = Baeta.createSingletonModule(createUserPhotosModule);
