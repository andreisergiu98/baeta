/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import * as Types from "../../__generated__/types.ts";
import type { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";
import baetaExtensions from "../../extensions/index.ts";


interface DefinedFields {
  PageInfo: 'hasPreviousPage' | 'hasNextPage';
  UserConnection: 'pageInfo' | 'edges';
  UserEdge: 'cursor' | 'node';
  UserPhotoConnection: 'pageInfo' | 'edges';
  UserPhotoEdge: 'cursor' | 'node';
};

export type PageInfo = Pick<Types.PageInfo, DefinedFields['PageInfo']>;
export type UserConnection = Pick<Types.UserConnection, DefinedFields['UserConnection']>;
export type UserEdge = Pick<Types.UserEdge, DefinedFields['UserEdge']>;
export type User = Pick<Types.User, Types.DefinedFieldsWithoutExtensions["User"]>;
export type UserPhotoConnection = Pick<Types.UserPhotoConnection, DefinedFields['UserPhotoConnection']>;
export type UserPhotoEdge = Pick<Types.UserPhotoEdge, DefinedFields['UserPhotoEdge']>;
export type UserPhoto = Pick<Types.UserPhoto, Types.DefinedFieldsWithoutExtensions["UserPhoto"]>;

export namespace ModuleMetadata {
  export const id = 'baeta-pagination';
  export const dirname = './baeta-pagination';
  export const hashes = {"PageInfo":{"hash":"f4iuf3","fieldsHashes":{"hasNextPage":"11lc64k","hasPreviousPage":"11lc64k"}},"UserConnection":{"hash":"1p21apv","fieldsHashes":{"edges":"phxsgo","pageInfo":"18aoznt"}},"UserEdge":{"hash":"meq6tv","fieldsHashes":{"cursor":"bsmiek","node":"14091bp"}},"UserPhotoConnection":{"hash":"481po7","fieldsHashes":{"edges":"12zsdbo","pageInfo":"18aoznt"}},"UserPhotoEdge":{"hash":"1k85929","fieldsHashes":{"cursor":"bsmiek","node":"e7fyck"}}};
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PageInfo","loc":{"start":134,"end":142}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"hasPreviousPage","loc":{"start":147,"end":162}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":164,"end":171}},"loc":{"start":164,"end":171}},"loc":{"start":164,"end":172}},"directives":[],"loc":{"start":147,"end":172}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"hasNextPage","loc":{"start":175,"end":186}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":188,"end":195}},"loc":{"start":188,"end":195}},"loc":{"start":188,"end":196}},"directives":[],"loc":{"start":175,"end":196}}],"loc":{"start":129,"end":198}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserConnection","loc":{"start":205,"end":219}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pageInfo","loc":{"start":224,"end":232}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo","loc":{"start":234,"end":242}},"loc":{"start":234,"end":242}},"loc":{"start":234,"end":243}},"directives":[],"loc":{"start":224,"end":243}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"edges","loc":{"start":246,"end":251}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserEdge","loc":{"start":254,"end":262}},"loc":{"start":254,"end":262}},"loc":{"start":253,"end":263}},"directives":[],"loc":{"start":246,"end":263}}],"loc":{"start":200,"end":265}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserEdge","loc":{"start":272,"end":280}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"cursor","loc":{"start":285,"end":291}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":293,"end":299}},"loc":{"start":293,"end":299}},"loc":{"start":293,"end":300}},"directives":[],"loc":{"start":285,"end":300}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"node","loc":{"start":303,"end":307}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User","loc":{"start":309,"end":313}},"loc":{"start":309,"end":313}},"directives":[],"loc":{"start":303,"end":313}}],"loc":{"start":267,"end":315}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserPhotoConnection","loc":{"start":322,"end":341}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pageInfo","loc":{"start":346,"end":354}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo","loc":{"start":356,"end":364}},"loc":{"start":356,"end":364}},"loc":{"start":356,"end":365}},"directives":[],"loc":{"start":346,"end":365}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"edges","loc":{"start":368,"end":373}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhotoEdge","loc":{"start":376,"end":389}},"loc":{"start":376,"end":389}},"loc":{"start":375,"end":390}},"directives":[],"loc":{"start":368,"end":390}}],"loc":{"start":317,"end":392}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserPhotoEdge","loc":{"start":399,"end":412}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"cursor","loc":{"start":417,"end":423}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":425,"end":431}},"loc":{"start":425,"end":431}},"loc":{"start":425,"end":432}},"directives":[],"loc":{"start":417,"end":432}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"node","loc":{"start":435,"end":439}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPhoto","loc":{"start":441,"end":450}},"loc":{"start":441,"end":450}},"directives":[],"loc":{"start":435,"end":450}}],"loc":{"start":394,"end":452}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      PageInfo: {
        ...module.createTypeMethods<PageInfo, Types.ContextType>("PageInfo"),
        hasPreviousPage: module.createResolverBuilder<Types.Scalars["Boolean"]["output"], PageInfo, Types.ContextType, { }>("PageInfo", "hasPreviousPage"),
        hasNextPage: module.createResolverBuilder<Types.Scalars["Boolean"]["output"], PageInfo, Types.ContextType, { }>("PageInfo", "hasNextPage"),
      },
      UserConnection: {
        ...module.createTypeMethods<UserConnection, Types.ContextType>("UserConnection"),
        pageInfo: module.createResolverBuilder<PageInfo, UserConnection, Types.ContextType, { }>("UserConnection", "pageInfo"),
        edges: module.createResolverBuilder<Types.Maybe<Array<Types.Maybe<UserEdge>>>, UserConnection, Types.ContextType, { }>("UserConnection", "edges"),
      },
      UserEdge: {
        ...module.createTypeMethods<UserEdge, Types.ContextType>("UserEdge"),
        cursor: module.createResolverBuilder<Types.Scalars["String"]["output"], UserEdge, Types.ContextType, { }>("UserEdge", "cursor"),
        node: module.createResolverBuilder<Types.Maybe<User>, UserEdge, Types.ContextType, { }>("UserEdge", "node"),
      },
      UserPhotoConnection: {
        ...module.createTypeMethods<UserPhotoConnection, Types.ContextType>("UserPhotoConnection"),
        pageInfo: module.createResolverBuilder<PageInfo, UserPhotoConnection, Types.ContextType, { }>("UserPhotoConnection", "pageInfo"),
        edges: module.createResolverBuilder<Types.Maybe<Array<Types.Maybe<UserPhotoEdge>>>, UserPhotoConnection, Types.ContextType, { }>("UserPhotoConnection", "edges"),
      },
      UserPhotoEdge: {
        ...module.createTypeMethods<UserPhotoEdge, Types.ContextType>("UserPhotoEdge"),
        cursor: module.createResolverBuilder<Types.Scalars["String"]["output"], UserPhotoEdge, Types.ContextType, { }>("UserPhotoEdge", "cursor"),
        node: module.createResolverBuilder<Types.Maybe<UserPhoto>, UserPhotoEdge, Types.ContextType, { }>("UserPhotoEdge", "node"),
      },
    };
  }
}

export const createBaetaPaginationModule = () => Baeta.createModuleManager(ModuleMetadata, baetaExtensions);
export const getBaetaPaginationModule = Baeta.createSingletonModule(createBaetaPaginationModule);
