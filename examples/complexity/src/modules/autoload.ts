/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import "./user/user.complexity";

import "./user/user.resolvers";

import "./user-photos/user-photos.resolvers";

import {getUserPhotosModule} from "./user-photos/typedef";

import {getUserModule} from "./user/typedef";

export const modules = [getUserPhotosModule(), getUserModule()];