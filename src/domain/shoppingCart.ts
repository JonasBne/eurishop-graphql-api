/* eslint-disable max-len */
import Product from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export function calculateTotalCostPerCartItem(cartItem: CartItem) {
  return parseInt((cartItem.quantity * cartItem.product.price).toFixed(2), 10);
}

export function calculateTotalCartCost(cartItems: CartItem[]) {
  const totalPerProductArray = cartItems.map((item) => calculateTotalCostPerCartItem(item));
  return totalPerProductArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);
}
