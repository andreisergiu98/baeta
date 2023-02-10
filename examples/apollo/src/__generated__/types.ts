/* This file was generated by baeta. Do not edit it directly. */

/* eslint-disable */
/* prettier-ignore */

import type { Context as ContextType } from '../types/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type { ContextType }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserPhotoConnection = {
  __typename?: 'UserPhotoConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<UserPhotoEdge>>>;
};

export type UserPhotoEdge = {
  __typename?: 'UserPhotoEdge';
  cursor: Scalars['String'];
  node?: Maybe<UserPhoto>;
};

export type UserPhoto = {
  __typename?: 'UserPhoto';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  photos?: Maybe<Array<UserPhoto>>;
  photosConnection?: Maybe<UserPhotoConnection>;
  id: Scalars['ID'];
  name: Scalars['String'];
  birthday?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type DateTime = Scalars["DateTime"];