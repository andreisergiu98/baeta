import React, { createElement, FunctionComponent, PropsWithChildren } from 'react';
import { ConfigProviderBase } from './ConfigProvider';

export function Providers(props: PropsWithChildren) {
  return <ConfigProviderBase>{props.children}</ConfigProviderBase>;
}

export function withProviders<P extends Record<string, unknown>>(
  Component: FunctionComponent<P>,
  props?: P | null
) {
  return () => {
    <Providers>{createElement(Component, props)}</Providers>;
  };
}
