import React from 'react';
import ProductList from './ProductList';
import { render, screen, waitFor, within } from '../../tests/utils';
import { server } from '../../mockServer';
import { getAllProducts, getAllProductsFailed } from '../../tests/fixtures/product';

describe('failed query', () => {
  test('renders a error modal', async () => {
    server.use(getAllProductsFailed(404));

    render(<ProductList />);

    const errorModal = await screen.findByRole('alert');
    expect(errorModal).toBeInTheDocument();
  });
});

describe('succesful query', () => {
  test('renders a loading spinner and table', async () => {
    server.use(getAllProducts);

    render(<ProductList />);

    const loadingSpinner = screen.getByRole('loading');
    expect(loadingSpinner).toBeInTheDocument();

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    const tableRows = await waitFor(() => within(table).findAllByRole('row'));
    expect(tableRows.length).toBeGreaterThan(0);

    const tableColumns = await waitFor(() => within(table).findAllByRole('columnheader'));
    expect(tableColumns.length).toBeGreaterThan(0);
  });
});
