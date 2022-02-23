/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import Home from './Home';
import { render, screen } from '../../tests/utils';
import { server } from '../../mockServer';
import { getAllProductsHome, getAllProductsHomeFailed, getSingleProduct } from '../../tests/fixtures/product';
import { getBasket, getBasketFailed } from '../../tests/fixtures/basket';

describe('failed query', () => {
  test('renders a error modal', async () => {
    server.use(getAllProductsHomeFailed);
    server.use(getBasketFailed(404));

    render(<Home />);

    const errorModal = await screen.findByRole('alert');
    expect(errorModal).toBeInTheDocument();
  });
});

describe('succesful query', () => {
  test('renders a loading spinner, product cards and basket', async () => {
    server.use(getAllProductsHome);
    server.use(getSingleProduct);
    server.use(getBasket);

    render(<Home />);

    const loadingSpinner = screen.getByRole('loading');
    expect(loadingSpinner).toBeInTheDocument();

    const productCards = await screen.findAllByRole('card');
    expect(productCards.length).toBeGreaterThanOrEqual(1);

    const basketItems = await screen.findAllByRole('cart-item');
    expect(basketItems.length).toBeGreaterThanOrEqual(1);
  });
});
