import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

function Backdrop() {
  return <Div />;
}

export default Backdrop;
