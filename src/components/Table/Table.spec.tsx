import React from 'react';
import userEvent from '@testing-library/user-event';
import Product from '../../domain/product';
import Table from './Table';
import { render, screen, within } from '../../tests/utils';

describe('product list', () => {
  let sortExpression: string;
  let columns: any[];
  let products: Product[];

  let mockSetSortExpression: () => void;
  let mockOnLoad: () => void;
  let mockOnRowClick: () => void;
  let mockOnActionClick: () => void;

  beforeEach(() => {
    sortExpression = '';
    products = [
      {
        id: 1,
        title: 'product1',
        sku: 'AAA',
        basePrice: 10.0,
        price: 10.0,
        image: 'https://dummyimage.com',
        desc: 'description product1',
      },
      {
        id: 2,
        title: 'product2',
        sku: 'BBB',
        basePrice: 20.0,
        price: 20.0,
        image: 'https://dummyimage.com',
        desc: 'description product2',
      },
    ] as Product[];
    columns = [
      {
        name: 'id',
        label: 'Product ID',
        sortable: true,
        id: 'col1',
      },
      {
        name: 'sku',
        label: 'Product number',
        sortable: true,
        id: 'col2',
      },
      {
        name: 'title',
        label: 'Title',
        sortable: true,
        id: 'col3',
      },
      {
        name: 'desc',
        label: 'Description',
        sortable: false,
        id: 'col4',
      },
      {
        name: 'image',
        label: 'Image URL',
        sortable: false,
        id: 'col5',
      },
      {
        name: 'stocked',
        label: 'In stock',
        sortable: true,
        id: 'col6',
      },
      {
        name: 'basePrice',
        label: 'Base price',
        sortable: true,
        id: 'col7',
      },
      {
        name: 'price',
        label: 'Unit price',
        sortable: true,
        id: 'col8',
      },
      {
        name: 'actions',
        label: 'Actions',
        sortable: false,
        id: 'col9',
      },
    ];
    mockSetSortExpression = jest.fn();
    mockOnLoad = jest.fn();
    mockOnRowClick = jest.fn();
    mockOnActionClick = jest.fn();
  });

  test('number of columns matches the number of columns passed to table', () => {
    render(
      <Table
        data={products}
        columns={columns}
        onLoadData={mockOnLoad}
        onRowClick={mockOnRowClick}
        onActionClick={mockOnActionClick}
        sortExpression={sortExpression}
        setSortExpression={mockSetSortExpression}
      />,
    );

    const tableHead = screen.getByRole('rowgroup');
    const tableColumns = within(tableHead).getAllByRole('columnheader');

    expect(tableColumns.length).toEqual(columns.length);
  });

  test('number of table rows matches number of products', () => {
    render(
      <Table
        data={products}
        columns={columns}
        onLoadData={mockOnLoad}
        onRowClick={mockOnRowClick}
        onActionClick={mockOnActionClick}
        sortExpression={sortExpression}
        setSortExpression={mockSetSortExpression}
      />,
    );

    const tableBody = screen.getByRole('tablebody');
    const tableRows = within(tableBody).getAllByRole('row');

    expect(tableRows.length).toEqual(products.length);
  });

  test('click fires onRowClick event', () => {
    render(
      <Table
        data={products}
        columns={columns}
        onLoadData={mockOnLoad}
        onRowClick={mockOnRowClick}
        onActionClick={mockOnActionClick}
        sortExpression={sortExpression}
        setSortExpression={mockSetSortExpression}
      />,
    );

    userEvent.click(screen.getAllByRole('cell')[0]);

    expect(mockOnRowClick).toBeCalledTimes(1);
  });
  test('click fires onLoadData event', () => {
    render(
      <Table
        data={products}
        columns={columns}
        onLoadData={mockOnLoad}
        onRowClick={mockOnRowClick}
        onActionClick={mockOnActionClick}
        sortExpression={sortExpression}
        setSortExpression={mockSetSortExpression}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /load more/i }));

    expect(mockOnLoad).toBeCalledTimes(1);
  });

  test('click fires onActionClick event', () => {
    render(
      <Table
        data={products}
        columns={columns}
        onLoadData={mockOnLoad}
        onRowClick={mockOnRowClick}
        onActionClick={mockOnActionClick}
        sortExpression={sortExpression}
        setSortExpression={mockSetSortExpression}
      />,
    );

    userEvent.click(screen.getAllByLabelText('trash-bin')[0]);

    expect(mockOnActionClick).toBeCalledTimes(1);
  });

  test('click fires setSortExpression', () => {
    render(
      <Table
        data={products}
        columns={columns}
        onLoadData={mockOnLoad}
        onRowClick={mockOnRowClick}
        onActionClick={mockOnActionClick}
        sortExpression={sortExpression}
        setSortExpression={mockSetSortExpression}
      />,
    );

    userEvent.click(screen.getAllByLabelText('sort-icon')[0]);

    expect(mockSetSortExpression).toBeCalledTimes(1);
  });
});
