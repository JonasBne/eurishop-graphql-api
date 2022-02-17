/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGetProduct, ProductDTO, useMutationProductPut } from '../../api/productsApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import ProductForm, { ProductFormValues } from './ProductForm';
import toasts from '../../components/toasts';

function ProductEdit() {
  const { succesToast, failToast } = toasts();
  const navigate = useNavigate();
  const { productId } = useParams<string>();
  const { isLoading, error, product } = useGetProduct(productId!);
  const { mutate, error: putError, data: puttedData } = useMutationProductPut();

  const gridTemplateAreas = `
  "title sku"
  "basePrice price"
  "stocked image"
  "desc desc"
  `;

  useEffect(() => {
    if (putError) {
      failToast(putError);
    }
    if (puttedData) {
      succesToast(`Item with id ${puttedData.id} updated!`);
      navigate('/products/admin');
    }
  }, [putError, puttedData]);

  const handleCancel = () => {
    navigate('/products/admin');
  };

  const handleSubmit = (formValues: ProductFormValues) => {
    const item: ProductDTO = {
      ...formValues,
      id: +formValues.id,
      basePrice: +formValues.basePrice,
      price: +formValues.price,
    };

    mutate({ productId: item.id, product: item });
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
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
