/* This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator. */
/* eslint-disable */
/* @biome-ignore-all: generated file */


CREATE TABLE Subscriptions (
  id VARCHAR(64) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  connectionId VARCHAR(64) NOT NULL,
  connectionPoolId VARCHAR(64) NOT NULL,
  data TEXT NOT NULL
);
