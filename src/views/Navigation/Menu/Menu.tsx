import React from 'react';
import { StyledMenu, StyledLink } from './Menu.styles';

interface MenuProps {
  open: boolean;
  setOpen: (prevState: boolean) => void;
}

function Menu({ open, setOpen }: MenuProps) {
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <StyledMenu open={open}>
      <StyledLink to="home" onClick={handleClick}>
        HOME
      </StyledLink>
      <StyledLink to="products/admin" onClick={handleClick}>
        PRODUCTS (ADMIN)
      </StyledLink>
    </StyledMenu>
  );
}

export default Menu;
