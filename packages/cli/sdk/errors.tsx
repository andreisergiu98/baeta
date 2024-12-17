import style from 'ansi-styles';
import { Text } from 'ink';
import type { TextOutput } from '../types/text.ts';

export interface ErrorsProps {
	warnings?: TextOutput[];
	errors?: TextOutput[];
}

export type { TextOutput };

const errorIcon = `${style.red.open}✘${style.red.close}`;
const errorTag = `${style.bgRed.open}[ERROR]${style.bgRed.close}`;

export const errorNamespace = `${errorIcon} ${errorTag}`;

export function makeErrorMessage(message: string, bold = false) {
	const wrapped = `${errorNamespace} ${message}`;

	if (!bold) {
		return wrapped;
	}

	return `${style.bold.open}${wrapped}${style.bold.close}`;
}

export function makeErrorOutput(id: string, message: string, bold = false) {
	return {
		id,
		text: makeErrorMessage(message, bold),
	};
}

export function Errors(props: ErrorsProps) {
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
