import React, { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDownAnimation = keyframes`
from {
  opacity: 0;
  transform: translateY(-3rem);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 35vh;
  left: 40%;
  width: fit-content;
  background-color: white;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: ${slideDownAnimation} 300ms ease-out forwards;
`;

interface OverlayProps {
  children: ReactNode;
}

function Overlay({ children }: OverlayProps) {
  return (
    <ModalOverlay>
      <div>{children}</div>
    </ModalOverlay>
  );
}

export default Overlay;
