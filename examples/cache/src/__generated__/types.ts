/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */
/* @biome-ignore-all: generated file */

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
  DateTime: { input: Date; output: Date; }
  UUID: { input: any; output: any; }
};

export type StringFormat =
  | 'EMAIL'
  | 'UUID'
  | 'URL';

export type UserPhoto = {
  __typename?: 'UserPhoto';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  photos?: Maybe<Array<UserPhoto>>;
  id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  profile?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  givenName?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  profile?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  where?: InputMaybe<UserWhereUniqueInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  where: UserWhereUniqueInput;
  data: UpdateUserInput;
};

export type Subscription = {
  __typename?: 'Subscription';
  userCreated: User;
  userUpdated: User;
};

export type DateTime = Scalars["DateTime"];
export type Uuid = Scalars["UUID"];

export type DefinedFieldsWithoutExtensions = {
  UserPhoto: "id" | "url";
  User: "id" | "email" | "lastName" | "profile" | "givenName" | "birthday";
};

export type DefinedUnionsWithoutExtensions = {

};

export type DefinedUnionsResults = {

};

export type DefinedInterfacesWithoutExtensions = {

};

export type DefinedInterfacesResults = {

};
