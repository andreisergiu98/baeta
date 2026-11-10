import { styleText } from 'node:util';

const errorNamespace = `${styleText('red', '✘')} ${styleText('bgRed', '[ERROR]')}`;
const warningNamespace = `${styleText('yellow', '▲')} ${styleText('bgYellow', '[WARNING]')}`;

export function makeErrorMessage(message: string, bold = false) {
	const wrapped = `${errorNamespace} ${message}`;
	return bold ? styleText('bold', wrapped) : wrapped;
}

export function makeWarningMessage(message: string, bold = false) {
	const wrapped = `${warningNamespace} ${message}`;
	return bold ? styleText('bold', wrapped) : wrapped;
}
