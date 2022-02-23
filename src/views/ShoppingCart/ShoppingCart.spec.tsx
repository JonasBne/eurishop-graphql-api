import React from 'react';
import userEvent from '@testing-library/user-event';
import ShoppingCart from './ShoppingCart';
import { calculateTotalCartCost } from '../../domain/shoppingCart';
import { render, screen } from '../../tests/utils';
import { BasketItem } from '../../graphql/types';

const mockOnClear = jest.fn();

describe('shopping cart', () => {
  let cartItems: BasketItem[];
  beforeEach(() => {
    cartItems = [
      {
        id: '1',
        product: {
          id: 1,
          title: 'product1',
          price: 5.0,
        },
        quantity: 1,
      },
      {
        id: '2',
        product: {
          id: 2,
          title: 'product2',
          price: 10.0,
        },
        quantity: 1,
      },
    ];
  });

  test('renders a total cost', () => {
    render(<ShoppingCart cartItems={cartItems} onClear={mockOnClear} />);

    const totalCost = parseInt(calculateTotalCartCost(cartItems), 10);
    expect(totalCost).toBe(15);
  });

  test('click fires onClear event', () => {
    render(<ShoppingCart cartItems={cartItems} onClear={mockOnClear} />);

    const clearBtn = screen.getByRole('button', { name: /clear/i });
    userEvent.click(clearBtn);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  test('renders two cart items', () => {
    render(<ShoppingCart cartItems={cartItems} onClear={mockOnClear} />);

    const items = screen.getAllByRole('cart-item');

    expect(items.length).toBe(2);
  });
});
