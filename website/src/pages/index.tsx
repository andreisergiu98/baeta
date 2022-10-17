import Layout from '@theme/Layout';
import React from 'react';
import { Features } from './home/features';
import { Header } from './home/header';
import { Snippets } from './home/snippets/snippets';

export default function Home(): JSX.Element {
  return (
    <Layout title={`Home`} description="Schema first without the hassle">
      <Header />
      <main>
        <Features />
        <Snippets />
      </main>
    </Layout>
  );
}
