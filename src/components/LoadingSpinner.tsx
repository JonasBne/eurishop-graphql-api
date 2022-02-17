/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { space, SpaceProps } from 'styled-system';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div<SpaceProps>`
  ${space};
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
`;

function LoadingSpinner() {
  return <Loader mx="auto" mt="3rem" role="loading" aria-busy="true" />;
}

export default LoadingSpinner;
