/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */
/* @biome-ignore-all: generated file */

import * as Types from "../../__generated__/types.ts";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";
import baetaExtensions from "../../extensions/index.ts";


interface DefinedFields {
  UserPhoto: 'id' | 'url';
  User: 'photosConnection' | 'photos';
};

interface DefinedInputFields {
  UserPhotoPage: 'cursor' | 'limit';
};

export type UserPhotoPage = Pick<Types.UserPhotoPage, DefinedInputFields['UserPhotoPage']>;
export type User = Pick<Types.User, Types.DefinedFieldsWithoutExtensions["User"]>;
export type UserPhotoConnection = Pick<Types.UserPhotoConnection, Types.DefinedFieldsWithoutExtensions["UserPhotoConnection"]>;
export type UserPhoto = Pick<Types.UserPhoto, DefinedFields['UserPhoto']>;

export namespace ModuleMetadata {
  export const id = 'user-photos';
  export const dirname = './user-photos';
  export const hashes = {"User":{"hash":"11vpwyu","fieldsHashes":{"photos":"1ve18yx"}},"UserPhoto":{"hash":"3noyzl","fieldsHashes":{"id":"1ij53kg","url":"bsmiek"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UserPhotoPage","loc":{"start":6,"end":19}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"cursor","loc":{"start":23,"end":29}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":31,"end":33}},"loc":{"start":31,"end":33}},"directives":[],"loc":{"start":23,"end":33}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"limit","loc":{"start":35,"end":40}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":42,"end":45}},"loc":{"start":42,"end":45}},"loc":{"start":42,"end":46}},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"validInt","loc":{"start":48,"end":56}},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"min","loc":{"start":57,"end":60}},"value":{"kind":"IntValue","value":"1","loc":{"start":62,"end":63}},"loc":{"start":57,"end":63}},{"kind":"Argument","name":{"kind":"Name","value":"max","loc":{"start":65,"end":68}},"value":{"kind":"IntValue","value":"50","loc":{"start":70,"end":72}},"loc":{"start":65,"end":72}}],"loc":{"start":47,"end":73}}],"loc":{"start":35,"end":73}}],"loc":{"start":0,"end":75}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"User","loc":{"start":89,"end":93}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"photosConnection","loc":{"start":97,"end":113}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"page","loc":{"start":114,"end":118}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhotoPage","loc":{"start":120,"end":133}},"loc":{"start":120,"end":133}},"loc":{"start":120,"end":134}},"directives":[],"loc":{"start":114,"end":134}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhotoConnection","loc":{"start":137,"end":156}},"loc":{"start":137,"end":156}},"directives":[],"loc":{"start":97,"end":156}}],"loc":{"start":77,"end":158}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserPhoto","loc":{"start":5,"end":14}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":18,"end":20}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":22,"end":24}},"loc":{"start":22,"end":24}},"loc":{"start":22,"end":25}},"directives":[],"loc":{"start":18,"end":25}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url","loc":{"start":27,"end":30}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":32,"end":38}},"loc":{"start":32,"end":38}},"loc":{"start":32,"end":39}},"directives":[],"loc":{"start":27,"end":39}}],"loc":{"start":0,"end":41}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"User","loc":{"start":55,"end":59}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"photos","loc":{"start":63,"end":69}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhoto","loc":{"start":72,"end":81}},"loc":{"start":72,"end":81}},"loc":{"start":72,"end":82}},"loc":{"start":71,"end":83}},"directives":[],"loc":{"start":63,"end":83}}],"loc":{"start":43,"end":85}}]} as unknown as DocumentNode;
  
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
        photosConnection: module.createResolverBuilder<Types.Maybe<UserPhotoConnection>, User, Types.ContextType, Types.UserPhotosConnectionArgs>("User", "photosConnection"),
        photos: module.createResolverBuilder<Types.Maybe<Array<UserPhoto>>, User, Types.ContextType, { }>("User", "photos"),
      },
    };
  }
}

export const createUserPhotosModule = () => Baeta.createModuleManager(ModuleMetadata, baetaExtensions);
export const getUserPhotosModule = Baeta.createSingletonModule(createUserPhotosModule);
