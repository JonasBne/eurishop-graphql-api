/* eslint-disable max-len */
import React, { useContext } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from 'styled-components';
import Box from '../../components/Box';
import FlexBox from '../../components/FlexBox';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BasketItem from './BasketItem';
import { CartItem, calculateTotalCartCost } from '../../domain/shoppingCart';
import FaIcon from '../../assets/FaIcon';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onUpdate: (quantity: number, productId: string | number) => void;
  onClear: () => void;
}

function ShoppingCart({ cartItems, onUpdate, onClear }: ShoppingCartProps) {
  const theme = useContext(ThemeContext);

  const handleClear = () => {
    onClear();
  };

  return (
    <Box
      width="100%"
      mt="2rem"
      mr="1rem"
      borderRadius="20px"
      backgroundColor={theme.colors.whites.primaryWhite}
      boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;"
    >
      <Header as="h2" role="heading" aria-level={2} variant="tertiary">
        Shopping Cart
        <FaIcon ml="1rem" icon={faShoppingCart} />
      </Header>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Box pl="1rem" key={item.product.id}>
              <BasketItem item={item} onUpdate={onUpdate} data-test-id={item.product.id} />
              <hr />
            </Box>
          ))
        ) : (
          <Box margin="2rem 3rem">Oops, your cart looks empty...</Box>
        )}
      </div>
      {cartItems.length > 0 && (
        <div>
          <Header as="h3" mt="2rem" mb="3rem" textAlign="center">
            {`TOTAL: € ${calculateTotalCartCost(cartItems)}`}
          </Header>
          <FlexBox justifyContent="center" m="2rem">
            <Button type="button" variant="danger" mx="1rem" onClick={handleClear}>
              CLEAR
            </Button>
            <Button type="button" variant="success" mx="1rem">
              ORDER
            </Button>
          </FlexBox>
        </div>
      )}
    </Box>
  );
}

export default ShoppingCart;
