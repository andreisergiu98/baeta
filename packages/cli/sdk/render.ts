import { render } from 'ink';
import { createElement, type FunctionComponent } from 'react';
import { type ConfigProps, ConfigProvider } from './config-provider.tsx';

export function renderComponentWithoutConfig<P extends {}>(
	component: FunctionComponent<P>,
	props?: P | null,
) {
	render(createElement(component, props));
}

export function renderComponent<P extends {}>(
	Component: FunctionComponent<P>,
	props: P,
	configProps?: ConfigProps,
) {
	render(createElement(ConfigProvider, configProps, createElement(Component, props)));
}
