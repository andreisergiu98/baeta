import { styleText } from 'node:util';
import symbols from 'log-symbols';

const flagPattern = /(name|number|code|path)=$/;

function style(flag: string, value: string): string {
	switch (flag) {
		case 'name':
			return styleText(['blue', 'bold'], value);
		case 'number':
			return styleText('yellow', value);
		case 'code':
			return styleText('cyan', `\`${value}\``);
		case 'path':
			return styleText(['cyan', 'underline'], value);
		default:
			return value;
	}
}

function interpolate(strings: TemplateStringsArray, ...values: unknown[]): string {
	let result = strings[0] ?? '';
	for (let i = 0; i < values.length; i++) {
		const flag = result.match(flagPattern)?.[1];
		let text = String(values[i]);
		if (flag) {
			result = result.slice(0, -(flag.length + 1));
			text = style(flag, text);
		}
		result += text + (strings[i + 1] ?? '');
	}
	return result;
}

type LogArgs = [message: unknown] | [strings: TemplateStringsArray, ...values: unknown[]];

function isTemplate(args: LogArgs): args is [TemplateStringsArray, ...unknown[]] {
	return Array.isArray(args[0]) && 'raw' in args[0];
}

function format(args: LogArgs): unknown {
	return isTemplate(args) ? interpolate(...args) : args[0];
}

export const logger = {
	info: (...args: LogArgs) => {
		console.log(symbols.info, format(args));
	},
	success: (...args: LogArgs) => {
		console.log(symbols.success, format(args));
	},
	error: (...args: LogArgs) => {
		console.error(symbols.error, format(args));
	},
	interpolate,
};
