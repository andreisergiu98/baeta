/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */

import "./baeta-directives/directives.baeta.ts";

import "./scalars/scalars.resolvers.ts";

import "./user/user.auth.ts";

import "./user/user.mutations.ts";

import "./user/user.queries.ts";

import "./user/user.subscriptions.ts";

import "./user-photos/user-photos.auth.ts";

import "./user-photos/user-photos.resolvers.ts";

import {getBaetaDirectivesModule} from "./baeta-directives/typedef.ts";

import {getScalarsModule} from "./scalars/typedef.ts";

import {getUserPhotosModule} from "./user-photos/typedef.ts";

import {getUserModule} from "./user/typedef.ts";

export const modules = [getBaetaDirectivesModule(), getScalarsModule(), getUserPhotosModule(), getUserModule()];
