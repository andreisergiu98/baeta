import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import style from './snippet.module.css';

export interface SnippetProps {
	idx: number;
	title: ReactNode;
	description: ReactNode;
	snippet: string;
	path?: string;
	language?: string;
}

export function Snippet(props: SnippetProps) {
	const left = props.idx % 2 === 1;

	return (
		<div className="row">
			<div className={clsx('col col--6', left && style.second)}>
				<div className={style.snippetDescription}>
					<h3>{props.title}</h3>
					<p>{props.description}</p>
				</div>
			</div>
			<div className={clsx('col col--6', left && style.first)}>
				<CodeBlock title={props.path} language={props.language}>
					{props.snippet}
				</CodeBlock>
			</div>
		</div>
	);
}
