export function buildBlock({ name, lines }: { name: string; lines: string[] }): string {
	return [`${name} {`, ...lines.filter(Boolean).map(indent(2)), '};'].join('\n');
}

export function buildCodeBlock({ name, lines }: { name: string; lines: string[] }) {
	const linesWithSep = lines.filter(Boolean).map(indent(2)).join(',\n');
	return [`${name} {`, linesWithSep, '}'].join('\n');
}

export function indent(size: number) {
	const space = new Array(size).fill(' ').join('');
	function indentInner(val: string): string {
		return val
			.split('\n')
			.map((line) => `${space}${line}`)
			.join('\n');
	}
	return indentInner;
}

export function unique<T>(val: T, i: number, all: T[]): boolean {
	return i === all.indexOf(val);
}
