import { BasketItem } from '../graphql/types';
import { calculateTotalCostPerCartItem, calculateTotalCartCost } from './shoppingCart';

describe('calculate total cost per cart item', () => {
  test('multiply price by quantity', () => {
    const cartItem = { id: '1', product: { price: 13.0 }, quantity: 2 } as BasketItem;
    const result = calculateTotalCostPerCartItem(cartItem);
    expect(result).toBe(26.0);
  });
});

describe('calculate total shopping cart cost', () => {
  test('calculate total', () => {
    const cartItems = [
      { id: '1', product: { price: 10.0 }, quantity: 2 },
      { id: '2', product: { price: 10 }, quantity: 4 },
    ] as BasketItem[];
    const result = parseInt(calculateTotalCartCost(cartItems), 10);
    expect(result).toBe(60);
  });
});
