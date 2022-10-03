import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Generator, GeneratorProps } from './generator';

export function WithGenerator(props: GeneratorProps & PropsWithChildren) {
  const { children, ...rest } = props;
  const [generated, setGenerated] = useState(false);

  const onSuccess = useCallback(() => {
    setGenerated(true);
  }, []);

  return (
    <>
      <Generator {...rest} onSuccess={onSuccess} />
      {generated && children}
    </>
  );
}
