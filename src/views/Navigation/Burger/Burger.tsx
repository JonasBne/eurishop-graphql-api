import React from 'react';
import StyledBurger from './Burger.styles';

interface BurgerProps {
  open: boolean;
  setOpen: (prevState: boolean) => void;
}

function Burger({ open, setOpen }: BurgerProps) {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
}

export default Burger;
