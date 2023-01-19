import { Text } from 'ink';
import React from 'react';
import { Layout } from '../../sdk';

export function AppStatus({ output }: { output: string[] }) {
  return (
    <Layout title="App" color="blue">
      {output.map((value, index) => (
        <Text key={index}>{value}</Text>
      ))}
    </Layout>
  );
}
