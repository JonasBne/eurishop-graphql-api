import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface StyledMenuProps {
  open: boolean;
}

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.whites.primaryWhite};
  height: 100vh;
  text-align: left;
  width: 15rem;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }: StyledMenuProps) => (open ? 'translateX(0)' : 'translateX(-100%)')};
`;

const StyledLink = styled(Link)`
  text-transform: uppercase;
  padding: 1rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: #0d0c1d;
  text-decoration: none;
  transition: color 0.3s linear;

  &:hover {
    color: ${({ theme }) => theme.colors.blues.primaryBlue};
  }
`;

export { StyledMenu, StyledLink };
