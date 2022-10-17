import Layout from '@theme/Layout';
import React from 'react';
import { HomeFeatures } from '../components/home-features';
import { HomeHeader } from '../components/home-header';
import { HomeSnippets } from '../components/home-snippets';

export default function Home(): JSX.Element {
  return (
    <Layout title={`Home`} description="Schema first without the hassle">
      <HomeHeader />
      <main>
        <HomeFeatures />
        <HomeSnippets />
      </main>
    </Layout>
  );
}
