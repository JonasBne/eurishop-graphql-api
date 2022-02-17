import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
// import toasts from '../../components/toasts';
import ProductForm, { ProductFormValues } from './ProductForm';

function ProductAdd() {
  // const { succesToast, failToast } = toasts();
  const navigate = useNavigate();

  const gridTemplateAreas = `
  "title sku"
  "basePrice price"
  "stocked image"
  "desc desc"
  `;

  // useEffect(() => {
  //   if (postError) {
  //     failToast(postError);
  //   }
  //   if (postedProduct) {
  //     succesToast(`New product with id ${postedProduct.id} added!`);
  //     navigate('/products/admin');
  //   }
  // }, [postError, postedProduct]);

  const handleCancel = () => {
    navigate('/products/admin');
  };

  // TODO: fix types here
  const handleSubmit = (formValues: ProductFormValues) => {
    const product: any = {
      ...formValues,
      basePrice: +formValues.basePrice,
      price: +formValues.price,
      id: 0,
    };
    console.log(product);
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
