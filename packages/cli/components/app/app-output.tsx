import { Text } from 'ink';
import React from 'react';
import { Layout } from '../layout';

export function AppOutput({ output }: { output: string[] }) {
  return (
    <Layout title="App" color="blue">
      {output.map((value, index) => (
        <Text key={index}>{value}</Text>
      ))}
    </Layout>
  );
}
