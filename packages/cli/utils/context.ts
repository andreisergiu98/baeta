import {
  Context as ContextType,
  createContext,
  createElement,
  PropsWithChildren,
  Provider as ProviderType,
  useContext,
} from 'react';

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean;

  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string;

  /**
   * The display name of the context
   */
  name?: string;
}

type ProviderWrapped<Props> = (props: PropsWithChildren<Props>) => JSX.Element;
type WithValue<T, Props> = [ProviderWrapped<Props>, () => T, ContextType<T>];
type WithoutValue<T> = [ProviderType<T>, () => T, ContextType<T>];

function createHook<T>(
  Context: ContextType<T | undefined>,
  strict: boolean,
  errorMessage: string,
  name?: string
) {
  const useContextWrapper = () => {
    const context = useContext(Context);

    if (context == null && strict) {
      const error = new Error(errorMessage);
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContextWrapper);
      throw error;
    }

    return context;
  };

  useContextWrapper.displayName = `use${name ?? 'Context'}`;

  return useContextWrapper;
}

function createWrappedProvider<T, Props>(
  Context: ContextType<T | undefined>,
  useValue: (props: Props) => T,
  name?: string
) {
  const ProviderWrapper = (props: PropsWithChildren<Props>) => {
    const value = useValue(props);
    return createElement(Context.Provider, { value }, props.children);
  };
  ProviderWrapper.displayName = `${name ?? ''}ProviderWrapper`;

  return ProviderWrapper;
}

function createErrorMessage(name?: string) {
  let hook = 'useContext';
  if (name) {
    hook = 'use' + name;
  }

  let context = 'Context';
  if (name) {
    context = name + 'Context';
  }

  return `${hook}: \`${context}\` is undefined. Seems you forgot to wrap component within the Provider`;
}

export function createContextProvider<Type, Props>(
  options: CreateContextOptions,
  useValue: (props: Props) => Type
): WithValue<Type, Props>;

export function createContextProvider<Type>(
  options: CreateContextOptions
): WithoutValue<Type>;

export function createContextProvider<Type, Props>(
  options: CreateContextOptions = {},
  useValue?: (props: Props) => Type
) {
  const { name, strict = true, errorMessage = createErrorMessage(name) } = options;

  const Context = createContext<Type | undefined>(undefined);
  Context.displayName = name + 'Context';

  const useContextWrapper = createHook(Context, strict, errorMessage, name);

  if (useValue != null) {
    const Provider = createWrappedProvider(Context, useValue, name);
    return [Provider, useContextWrapper, Context] as WithValue<Type, Props>;
  }

  return [Context.Provider, useContextWrapper, Context] as WithoutValue<Type>;
}
