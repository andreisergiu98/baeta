import { Text } from '@baeta/ink';
import React from 'react';
import { Layout } from '../../sdk';

export function AppStatus({ output }: { output: string[] }) {
  return (
    <Layout title="App" color="blue">
      {output.map((value, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: it is safe in this case
        <Text key={index}>{value}</Text>
      ))}
    </Layout>
  );
}
