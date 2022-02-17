/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SpaceProps } from 'styled-system';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';
import FaIcon from '../../assets/FaIcon';
import Product from '../../domain/product';

interface ProductCardProps extends SpaceProps {
  product: Product;
  onBuy: (productId: string | number) => void;
}

function ProductCard({ product, onBuy, ...space }: ProductCardProps) {
  const handleBuy = (event: React.MouseEvent) => {
    event.preventDefault();
    onBuy(product.id!);
  };

  return (
    <Card
      title={product.title}
      image={product.image}
      content={product.desc}
      footerContent={`Unit price: € ${product.price}`}
      {...space}
    >
      {product.stocked ? (
        <Button type="button" variant="primary" my="1rem" mx="6rem" px="1rem" onClick={handleBuy}>
          ADD
          <FaIcon icon={faShoppingCart} mx=".25rem" />
        </Button>
      ) : (
        <Button type="button" variant="danger" my="1rem" mx="6rem" disabled>
          Out of stock
        </Button>
      )}
    </Card>
  );
}

export default ProductCard;
