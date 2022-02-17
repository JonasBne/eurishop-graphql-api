/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { space, SpaceProps, layout, LayoutProps } from 'styled-system';
import styled from 'styled-components';
import Grid from '../../components/Grid';
import Input from '../../components/Input';
import Label from '../../components/Label';
import TextArea from '../../components/TextArea';
import Header from '../../components/Header';
import Button from '../../components/Button';
import FlexBox from '../../components/FlexBox';
import Product from '../../domain/product';

const StyledForm = styled.form<SpaceProps | LayoutProps>`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 20px;
  width: 40%;
  background: ${({ theme }) => theme.colors.whites.primaryWhite};
  ${space}
  ${layout};
`;

interface ProductFormProps extends SpaceProps {
  title: string;
  initialProduct?: Product;
  gridTemplateAreas: string;
  onCancel?: () => void;
  onSubmit?: (formValues: ProductFormValues) => void;
}

export interface ProductFormValues {
  id: string;
  sku: string;
  title: string;
  desc: string;
  image: string;
  stocked: boolean;
  basePrice: string;
  price: string;
}

const noop: any = () => {};

function ProductForm({
  initialProduct,
  gridTemplateAreas,
  onCancel = noop,
  onSubmit = noop,
  title,
  ...spacing
}: ProductFormProps) {
  const { register, handleSubmit } = useForm<ProductFormValues>({
    defaultValues: {
      id: initialProduct?.id?.toString(),
      sku: initialProduct?.sku,
      title: initialProduct?.title,
      desc: initialProduct?.desc,
      image: initialProduct?.image,
      stocked: initialProduct?.stocked,
      basePrice: initialProduct?.basePrice.toString(),
      price: initialProduct?.price.toString(),
    },
  });

  const handleCancel = () => {
    onCancel();
  };

  const handleFormResult = (formValues: ProductFormValues) => {
    onSubmit(formValues);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleFormResult)} {...spacing} role="form">
      <Header p="2rem" as="h2" textAlign="center" variant="secondary">
        {title}
      </Header>
      <Grid gridTemplateAreas={gridTemplateAreas}>
        <Label htmlFor="sku" gridArea="sku">
          Serial number
          <Input id="sku" type="text" {...register('sku')} />
        </Label>

        <Label htmlFor="title" gridArea="title">
          Title
          <Input id="title" type="text" {...register('title')} />
        </Label>

        <Label htmlFor="stocked" gridArea="stocked">
          In stock
          <Input id="stocked" type="checkbox" {...register('stocked')} />
        </Label>

        <Label htmlFor="base-price" gridArea="basePrice">
          Base price
          <Input id="base-price" type="text" {...register('basePrice')} />
        </Label>

        <Label htmlFor="price" gridArea="price">
          Unit price
          <Input id="price" type="text" {...register('price')} />
        </Label>

        <Label htmlFor="image" gridArea="image">
          Image URL
          <Input id="image" type="text" {...register('image')} />
        </Label>

        <Label htmlFor="desc" gridArea="desc">
          Description
          <TextArea id="desc" {...register('desc')} />
        </Label>
      </Grid>
      <FlexBox mx="2rem" my="1rem" justifyContent="flex-end">
        <Button type="button" variant="danger" mx="0.5rem" mb="1rem" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" mx="0.5rem" mb="1rem">
          Save
        </Button>
      </FlexBox>
    </StyledForm>
  );
}

export default ProductForm;
