import { CartItem, calculateTotalCostPerCartItem, calculateTotalCartCost } from './shoppingCart';

describe('calculate total cost per cart item', () => {
  test('multiply price by quantity', () => {
    const cartItem = { product: { price: 13.00 }, quantity: 2 } as CartItem;
    const result = calculateTotalCostPerCartItem(cartItem);
    expect(result).toBe(26.00);
  });
});

describe('calculate total shopping cart cost', () => {
  test('calculate total', () => {
    const cartItems = [{ product: { price: 10.00 }, quantity: 2 },
      { product: { price: 10 }, quantity: 4 }] as CartItem[];
    const result = parseInt(calculateTotalCartCost(cartItems), 10);
    expect(result).toBe(60);
  });
});
