import React from 'react';
import userEvent from '@testing-library/user-event';
import ShoppingCart from './ShoppingCart';
import { calculateTotalCartCost } from '../../domain/shoppingCart';
import { render, screen } from '../../tests/utils';
import { BasketItem } from '../../graphql/types';

const mockOnRemove = jest.fn();
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
    render(<ShoppingCart cartItems={cartItems} onClear={mockOnClear} onRemove={mockOnRemove} />);

    const totalCost = parseInt(calculateTotalCartCost(cartItems), 10);
    expect(totalCost).toBe(15);
  });

  test('click fires onClear event', () => {
    render(<ShoppingCart cartItems={cartItems} onClear={mockOnClear} onRemove={mockOnRemove} />);

    const clearBtn = screen.getByRole('button', { name: /clear/i });
    userEvent.click(clearBtn);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  test('renders two cart items', () => {
    render(<ShoppingCart cartItems={cartItems} onClear={mockOnClear} onRemove={mockOnRemove} />);

    const items = screen.getAllByRole('cart-item');

    expect(items.length).toBe(2);
  });

  test('removes one cart item', async () => {
    render(<ShoppingCart cartItems={cartItems} onClear={mockOnClear} onRemove={mockOnRemove} />);

    const removeButtons = await screen.findAllByText(/remove/i);
    const removeButtonProduct2 = removeButtons[1];

    userEvent.click(removeButtonProduct2);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove.mock.calls[0][0]).toBe(2);
  });
});
