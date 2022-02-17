import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Box from '../../components/Box';
import { CartItem, calculateTotalCostPerCartItem } from '../../domain/shoppingCart';
import FlexBox from '../../components/FlexBox';

interface BasketItemProps {
  item: CartItem;
  onUpdate: (quantity: number, productId: string | number) => void;
}

function BasketItem({ item, onUpdate }: BasketItemProps) {
  const handleUpdate = (action: string) => {
    let { quantity } = item;
    const productId = item.product.id!;

    if (action === 'decrement') {
      quantity -= 1;
    }
    if (action === 'increment') {
      quantity += 1;
    }
    onUpdate(quantity, productId);
  };

  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div role="cart-item">
      <Header as="h4" role="heading">
        {item.product.title}
      </Header>
      <Box my="0.5rem" fontStyle="italic">{`Unit price: € ${item.product.price}`}</Box>
      <FlexBox alignItems="baseline" my="2rem">
        <Button type="button" variant="secondary" mr="1rem" onClick={() => handleUpdate('decrement')}>
          -
        </Button>
        <div>{item.quantity}</div>
        <Button type="button" variant="secondary" ml="1rem" onClick={() => handleUpdate('increment')}>
          +
        </Button>
      </FlexBox>
      <Box mt="0.5rem" mb="1rem" fontWeight="bold">
        {`Total: € ${calculateTotalCostPerCartItem(item)}`}
      </Box>
    </div>
  );
}

export default BasketItem;
