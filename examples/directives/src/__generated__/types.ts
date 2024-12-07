/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import type { Context as ContextType } from '../types/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type { ContextType }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type StringFormat =
  | 'EMAIL'
  | 'UUID'
  | 'URL';

export type Query = {
  __typename?: 'Query';
  testIncrementDirective: Scalars['Int']['output'];
  testUpperDirective?: Maybe<NameWithUpper>;
  user?: Maybe<User>;
};


export type QueryTestIncrementDirectiveArgs = {
  value: Scalars['Int']['input'];
};


export type QueryTestUpperDirectiveArgs = {
  name: Scalars['String']['input'];
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type NameWithUpper = {
  __typename?: 'NameWithUpper';
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type DefinedFieldsWithoutExtensions = {
  NameWithUpper: "name";
  User: "id" | "email" | "lastName" | "profile" | "givenName";
};

export type DefinedUnionsWithoutExtensions = {

};

export type DefinedUnionsResults = {

};

export type DefinedInterfacesWithoutExtensions = {

};

export type DefinedInterfacesResults = {

};