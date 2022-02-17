import React from 'react';
import userEvent from '@testing-library/user-event';
import ShoppingCart from './ShoppingCart';
import Product from '../../domain/product';
import { CartItem, calculateTotalCartCost } from '../../domain/shoppingCart';
import { render, screen, within, waitFor } from '../../tests/utils';

const mockOnUpdate = jest.fn();
const mockOnClear = jest.fn();

describe('shopping cart', () => {
  let cartItems: CartItem[];
  beforeEach(() => {
    cartItems = [
      {
        product: {
          id: 1,
          title: 'product1',
          price: 5.0,
        } as Product,
        quantity: 1,
      },
      {
        product: {
          id: 2,
          title: 'product2',
          price: 10.0,
        } as Product,
        quantity: 1,
      },
    ];
  });

  test('renders a total cost', () => {
    render(<ShoppingCart cartItems={cartItems} onUpdate={mockOnUpdate} onClear={mockOnClear} />);

    const totalCost = parseInt(calculateTotalCartCost(cartItems), 10);
    expect(totalCost).toBe(15);
  });

  test('click fires onClear event', () => {
    render(<ShoppingCart cartItems={cartItems} onUpdate={mockOnUpdate} onClear={mockOnClear} />);

    const clearBtn = screen.getByRole('button', { name: /clear/i });
    userEvent.click(clearBtn);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  test('renders two cart items', () => {
    render(<ShoppingCart cartItems={cartItems} onUpdate={mockOnUpdate} onClear={mockOnClear} />);

    const items = screen.getAllByRole('cart-item');

    expect(items.length).toBe(2);
  });

  test('click fires onUpdate event with action decrement quantity 0 and productId 1', async () => {
    render(<ShoppingCart cartItems={cartItems} onUpdate={mockOnUpdate} onClear={mockOnClear} />);

    const items = screen.getAllByRole('cart-item');
    const button = await waitFor(() => within(items[0]).findByRole('button', { name: '-' }));

    userEvent.click(button);

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(0, 1);
  });

  test('click fires onUpdate event with action increment quantity 2 and productId 1', async () => {
    render(<ShoppingCart cartItems={cartItems} onUpdate={mockOnUpdate} onClear={mockOnClear} />);

    const items = screen.getAllByRole('cart-item');
    const button = await waitFor(() => within(items[0]).findByRole('button', { name: '+' }));

    userEvent.click(button);

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(2, 1);
  });
});
