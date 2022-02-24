import { BasketItem } from '../graphql/types';

export function calculateTotalCostPerCartItem(cartItem: BasketItem) {
  if (!cartItem || !cartItem.quantity || !cartItem?.product?.price) return 0;

  return parseInt((cartItem.quantity * cartItem.product.price).toFixed(2), 10);
}

export function calculateTotalCartCost(cartItems: BasketItem[]) {
  if (!cartItems) return 0;

  const totalPerProductArray = cartItems.map((item) => calculateTotalCostPerCartItem(item));

  return totalPerProductArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)?.toFixed(2);
}
