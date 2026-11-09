import { extname } from '@baeta/util-path';

export type CommentStyle = { line: string; block?: [open: string, close: string] };

export const COMMENT_STYLES: Record<string, CommentStyle> = {
	'.ts': { line: '//', block: ['/*', '*/'] },
	'.mts': { line: '//', block: ['/*', '*/'] },
	'.cts': { line: '//', block: ['/*', '*/'] },
	'.tsx': { line: '//', block: ['/*', '*/'] },
	'.js': { line: '//', block: ['/*', '*/'] },
	'.mjs': { line: '//', block: ['/*', '*/'] },
	'.cjs': { line: '//', block: ['/*', '*/'] },
	'.jsx': { line: '//', block: ['/*', '*/'] },
	'.graphql': { line: '#' },
	'.gql': { line: '#' },
	'.sql': { line: '--', block: ['/*', '*/'] },
};

export function createComment(filename: string, comment: string, kind: 'line' | 'block' = 'line') {
	const style = COMMENT_STYLES[extname(filename)];
	if (!style) {
		return null;
	}
	if (kind === 'block' && style.block) {
		const [open, close] = style.block;
		return `${open} ${comment} ${close}`;
	}
	return comment
		.split('\n')
		.map((line) => `${style.line} ${line}`)
		.join('\n');
}
