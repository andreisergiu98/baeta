import React, { createElement, FunctionComponent } from "react";
import { PropsWithChildren } from "react";
import { ConfigProviderBase } from "./ConfigProvider";

export function Providers(props: PropsWithChildren) {
  return <ConfigProviderBase>{props.children}</ConfigProviderBase>;
}

export function withProviders<P extends {}>(
  Component: FunctionComponent<P>,
  props?: P | null
) {
  return () => {
    <Providers>{createElement(Component, props)}</Providers>;
  };
}
