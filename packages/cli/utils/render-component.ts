import { render } from 'ink';
import { createElement, FunctionComponent } from 'react';
import { ConfigProps, ConfigProvider } from '../providers/ConfigProvider';

export function renderComponentDumb<P extends {}>(
  component: FunctionComponent<P>,
  props?: P | null
) {
  render(createElement(component, props));
}

export function renderComponent<P extends {}>(
  Component: FunctionComponent<P>,
  props: P,
  configProps?: ConfigProps
) {
  render(createElement(ConfigProvider, configProps, createElement(Component, props)));
}
