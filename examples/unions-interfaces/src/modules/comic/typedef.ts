/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import * as Types from "../../__generated__/types";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";


interface DefinedFields {
  Comic: 'id' | 'title' | 'year' | 'artist' | 'pages';
  Readable: 'id' | 'pages';
};

export type Readable = Types.DefinedInterfacesWithoutExtensions["Readable"];
export type Comic = Pick<Types.Comic, DefinedFields['Comic']>;
export type Media = Types.DefinedUnionsWithoutExtensions["Media"];

export namespace ModuleMetadata {
  export const id = 'comic';
  export const dirname = './comic';
  export const hashes = {"Comic":{"hash":"1a5bwam","fieldsHashes":{"artist":"bsmiek","id":"1ij53kg","pages":"1es0thu","title":"bsmiek","year":"1es0thu"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"InterfaceTypeDefinition","name":{"kind":"Name","value":"Readable","loc":{"start":10,"end":18}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":22,"end":24}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":26,"end":28}},"loc":{"start":26,"end":28}},"loc":{"start":26,"end":29}},"directives":[],"loc":{"start":22,"end":29}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"pages","loc":{"start":31,"end":36}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":38,"end":41}},"loc":{"start":38,"end":41}},"loc":{"start":38,"end":42}},"directives":[],"loc":{"start":31,"end":42}}],"loc":{"start":0,"end":44}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Comic","loc":{"start":51,"end":56}},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Readable","loc":{"start":68,"end":76}},"loc":{"start":68,"end":76}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":80,"end":82}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID","loc":{"start":84,"end":86}},"loc":{"start":84,"end":86}},"loc":{"start":84,"end":87}},"directives":[],"loc":{"start":80,"end":87}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":89,"end":94}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":96,"end":102}},"loc":{"start":96,"end":102}},"loc":{"start":96,"end":103}},"directives":[],"loc":{"start":89,"end":103}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"year","loc":{"start":105,"end":109}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":111,"end":114}},"loc":{"start":111,"end":114}},"loc":{"start":111,"end":115}},"directives":[],"loc":{"start":105,"end":115}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"artist","loc":{"start":117,"end":123}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":125,"end":131}},"loc":{"start":125,"end":131}},"loc":{"start":125,"end":132}},"directives":[],"loc":{"start":117,"end":132}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"pages","loc":{"start":134,"end":139}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":141,"end":144}},"loc":{"start":141,"end":144}},"loc":{"start":141,"end":145}},"directives":[],"loc":{"start":134,"end":145}}],"loc":{"start":46,"end":147}},{"kind":"UnionTypeExtension","name":{"kind":"Name","value":"Media","loc":{"start":162,"end":167}},"directives":[],"types":[{"kind":"NamedType","name":{"kind":"Name","value":"Comic","loc":{"start":170,"end":175}},"loc":{"start":170,"end":175}}],"loc":{"start":149,"end":175}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      Comic: {
        ...module.createTypeMethods<Comic, Types.ContextType>("Comic"),
        id: module.createResolverBuilder<Types.Scalars["ID"]["output"], Comic, Types.ContextType, { }>("Comic", "id"),
        title: module.createResolverBuilder<Types.Scalars["String"]["output"], Comic, Types.ContextType, { }>("Comic", "title"),
        year: module.createResolverBuilder<Types.Scalars["Int"]["output"], Comic, Types.ContextType, { }>("Comic", "year"),
        artist: module.createResolverBuilder<Types.Scalars["String"]["output"], Comic, Types.ContextType, { }>("Comic", "artist"),
        pages: module.createResolverBuilder<Types.Scalars["Int"]["output"], Comic, Types.ContextType, { }>("Comic", "pages"),
      },
      Readable: {
        $resolveType: module.createResolveType<Types.DefinedInterfacesResults["Readable"], Types.DefinedInterfacesWithoutExtensions["Readable"], Types.ContextType>("Readable"),
      },
    };
  }
}

export const createComicModule = () => Baeta.createModuleManager(ModuleMetadata);
export const getComicModule = Baeta.createSingletonModule(createComicModule);