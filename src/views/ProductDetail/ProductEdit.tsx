/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import ProductForm, { ProductFormValues } from './ProductForm';
import toasts from '../../components/toasts';
import { GetSingleProductQuery } from '../../graphql/types';
import { GET_SINGLE_PRODUCT } from '../../graphql/queries';

function ProductEdit() {
  const { succesToast, failToast } = toasts();
  const navigate = useNavigate();
  const { productId } = useParams<string>();

  const { loading, error, data } = useQuery<GetSingleProductQuery>(GET_SINGLE_PRODUCT, {
    variables: {
      productId: parseInt(productId!, 10),
    },
  });

  const product = data?.product;

  const gridTemplateAreas = `
  "title sku"
  "basePrice price"
  "stocked image"
  "desc desc"
  `;

  // useEffect(() => {
  //   if (putError) {
  //     failToast(putError);
  //   }
  //   if (puttedData) {
  //     succesToast(`Item with id ${puttedData.id} updated!`);
  //     navigate('/products/admin');
  //   }
  // }, [putError, puttedData]);

  const handleCancel = () => {
    navigate('/products/admin');
  };

  // TODO: fix types here
  const handleSubmit = (formValues: ProductFormValues) => {
    const item: any = {
      ...formValues,
      id: +formValues.id,
      basePrice: +formValues.basePrice,
      price: +formValues.price,
    };

    console.log(item);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorModal name={error.name} message={error.message} />}
      {product && (
        <ProductForm
          title="EDIT PRODUCT"
          gridTemplateAreas={gridTemplateAreas}
          initialProduct={product}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          mt="2rem"
          mx="auto"
        />
      )}
    </>
  );
}

export default ProductEdit;
