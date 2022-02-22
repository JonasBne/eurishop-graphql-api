import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UPDATE_PRODUCT } from '../../graphql/queries';
import { AddOrUpdateProductMutation, AddOrUpdateProductMutationVariables, ProductInput } from '../../graphql/types';
import toasts from '../../components/toasts';
import ProductForm, { ProductFormValues } from './ProductForm';
import { GET_PRODUCTS } from '../../graphql/queries/ProductList';

function ProductAdd() {
  const { succesToast, failToast } = toasts();
  const navigate = useNavigate();

  const [postProduct, { error: postError, data: postedProduct }] = useMutation<
    AddOrUpdateProductMutation,
    AddOrUpdateProductMutationVariables
  >(UPDATE_PRODUCT, {
    refetchQueries: [
      {
        query: GET_PRODUCTS,
      },
    ],
  });

  const gridTemplateAreas = `
  "title sku"
  "basePrice price"
  "stocked image"
  "desc desc"
  `;

  useEffect(() => {
    if (postError) {
      failToast(postError);
    }
    if (postedProduct) {
      succesToast(`New product with id ${postedProduct.addOrUpdateProduct?.product?.id} added!`);
      navigate('/products/admin');
    }
  }, [postError, postedProduct]);

  const handleCancel = () => {
    navigate('/products/admin');
  };

  const handleSubmit = (formValues: ProductFormValues) => {
    const product: ProductInput = {
      ...formValues,
      basePrice: +formValues.basePrice,
      price: +formValues.price,
      id: 0,
    };
    postProduct({
      variables: {
        product,
      },
    });
  };

  return (
    <ProductForm
      title="NEW PRODUCT"
      gridTemplateAreas={gridTemplateAreas}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      mt="2rem"
      mx="auto"
    />
  );
}

export default ProductAdd;
