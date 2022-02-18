/* eslint-disable react/require-default-props */
import React, { ReactElement, ReactNode } from 'react';
import '@testing-library/jest-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { render as rtlRender, RenderOptions as rtlRenderHookOptions } from '@testing-library/react';
import { renderHook as rtlRenderHook } from '@testing-library/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import config from '../../config';

interface WrapperProps {
  children?: ReactNode;
}

const createWrapper = () => {
  const client = new ApolloClient({
    uri: config.serverUrl,
    cache: new InMemoryCache(),
  });
  // eslint-disable-next-line func-names
  return function ({ children }: WrapperProps) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  };
};

interface RenderOptions {
  theme: DefaultTheme;
}

export const render = (children: ReactElement, options?: RenderOptions) =>
  rtlRender(
    <BrowserRouter>
      <ThemeProvider theme={theme || options?.theme}>{children}</ThemeProvider>
    </BrowserRouter>,
    {
      wrapper: createWrapper(),
    },
  );

interface RenderHookOptions extends Omit<rtlRenderHookOptions, 'wrapper'> {
  // no extends
}

export const renderHook = <TProps, TResult>(callback: (props: TProps) => TResult, options?: RenderHookOptions) =>
  rtlRenderHook(callback, {
    ...options,
    wrapper: createWrapper(),
  });

export * from '@testing-library/react';
