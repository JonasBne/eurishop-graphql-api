import React from 'react';
import Header from '../../components/Header';
import Box from '../../components/Box';
import { calculateTotalCostPerCartItem } from '../../domain/shoppingCart';
import FlexBox from '../../components/FlexBox';

// TODO: add typing to item
interface BasketItemProps {
  item: any;
}

function BasketItem({ item }: BasketItemProps) {
  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div role="cart-item">
      <Header as="h4" role="heading">
        {item.product.title}
      </Header>
      <Box my="0.5rem" fontStyle="italic">{`Unit price: € ${item.product.price}`}</Box>
      <FlexBox alignItems="baseline" my="2rem">
        <div>Quantity: {item.quantity}</div>
      </FlexBox>
      <Box mt="0.5rem" mb="1rem" fontWeight="bold">
        {`Total: € ${calculateTotalCostPerCartItem(item)}`}
      </Box>
    </div>
  );
}

export default BasketItem;
