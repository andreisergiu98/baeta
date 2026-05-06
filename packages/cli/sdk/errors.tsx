import { styleText } from 'node:util';
import { Text } from 'ink';
import type { TextOutput } from '../types/text.ts';

export type { TextOutput } from '../types/text.ts';

export interface ErrorsProps {
	warnings?: TextOutput[];
	errors?: TextOutput[];
}

const errorIcon = styleText('red', '✘');
const errorTag = styleText('bgRed', '[ERROR]');

export const errorNamespace = `${errorIcon} ${errorTag}`;

export function makeErrorMessage(message: string, bold = false) {
	const wrapped = `${errorNamespace} ${message}`;

	if (!bold) {
		return wrapped;
	}

	return styleText('bold', wrapped);
}

export function makeErrorOutput(id: string, message: string, bold = false) {
	return {
		id,
		text: makeErrorMessage(message, bold),
	};
}

export function Errors(props: Readonly<ErrorsProps>) {
	return (
		<>
			{props.warnings?.map((warning) => (
				<Text key={warning.id} bold={true}>
					{warning.text}
				</Text>
			))}
			{props.errors?.map((error) => (
				<Text key={error.id} bold={true}>
					{error.text}
				</Text>
			))}
		</>
	);
}
