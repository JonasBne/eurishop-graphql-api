/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetProducts, useMutationProductRemove } from '../../api/productsApi';
import Table from '../../components/Table/Table';
import LoadingSpinner from '../../components/LoadingSpinner';
import sortBy from '../../utils/sortBy';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import Button from '../../components/Button';
import toasts from '../../components/toasts';

function ProductList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(0);
  const { succesToast, failToast } = toasts();
  const navigate = useNavigate();
  const { isLoading, error, products, refetch } = useGetProducts(page);

  const { mutate, error: deleteError, data: deletedData } = useMutationProductRemove();

  const [sortExpression, setSortExpression] = useState<string>('');

  useEffect(() => {
    if (deleteError) {
      failToast(deleteError);
    }
    if (deletedData) {
      succesToast(`Item with id: ${deletedData.id} removed!`);
      refetch();
    }
  }, [deleteError, deletedData]);

  const handleRedirect = (productId: string) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleAction = (productId: string) => {
    mutate({ productId });
  };

  const sortedProducts = sortBy(products ?? [], sortExpression);

  const columns = [
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

  const handleAddProductClick = () => {
    navigate('/products/new');
  };

  const handleLoadMoreData = () => {
    setPage((prePage) => prePage + 1);
  };

  return (
    <>
      {isLoading && !error && <LoadingSpinner />}
      {error && <ErrorModal name={error.name} message={error.message} />}
      {products && (
        <>
          <Button m="2rem 0 0 2rem" p="0.5rem 2rem" variant="primary" onClick={handleAddProductClick}>
            Add product +
          </Button>
          <Table
            data={sortedProducts}
            columns={columns}
            sortExpression={sortExpression}
            setSortExpression={setSortExpression}
            onRowClick={handleRedirect}
            onActionClick={handleAction}
            onLoadData={handleLoadMoreData}
            my="2.5rem"
            mx="2rem"
          />
        </>
      )}
    </>
  );
}

export default ProductList;
