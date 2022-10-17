import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import style from './snippet.module.css';

export interface SnippetProps {
  title: ReactNode;
  description: ReactNode;
  snippet: string;
  path?: string;
  language?: string;
  left?: boolean;
}

export function Snippet(props: SnippetProps) {
  return (
    <div className="row">
      <div className={clsx('col col--6', props.left && style.second)}>
        <div className={style.snippetDescription}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
      </div>
      <div className={clsx('col col--6', props.left && style.first)}>
        <CodeBlock title={props.path} language={props.language}>
          {props.snippet}
        </CodeBlock>
      </div>
    </div>
  );
}
