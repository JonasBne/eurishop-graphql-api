import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GetAllProductsHomeQuery } from '../../graphql/types';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import FlexBox from '../../components/FlexBox';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from './ProductCard';
// import ShoppingCart from '../ShoppingCart/ShoppingCart';
import toasts from '../../components/toasts';

const GET_PRODUCTS = gql`
  query getAllProductsHome {
    allProducts {
      product {
        id
        title
        stocked
        image
        desc
        price
      }
    }
  }
`;

function Home() {
  // const { succesToast, failToast } = toasts();

  const { loading, error, data } = useQuery<GetAllProductsHomeQuery>(GET_PRODUCTS);
  const products = data?.allProducts?.product ?? [];

  // useEffect(() => {
  //   if (postBasketError) {
  //     failToast(postBasketError);
  //   }
  //   if (patchBasketError) {
  //     failToast(patchBasketError);
  //   }
  //   if (removeItemError) {
  //     failToast(removeItemError);
  //   }
  //   if (clearBasketError) {
  //     failToast(clearBasketError);
  //   }
  //   if (postedData || patchedData || removedData || clearedData) {
  //     succesToast('Success!');
  //     cartRefetch();
  //   }
  // }, [
  //   postBasketError,
  //   patchBasketError,
  //   removeItemError,
  //   clearBasketError,
  //   postedData,
  //   patchedData,
  //   removedData,
  //   clearedData,
  // ]);

  const handleBuy = (productId: string | number) => {
    console.log('buy');
  };

  const handleUpdate = (quantity: number, productId: string | number) => {
    console.log('update');
  };

  const handleClear = () => {
    console.log('clear');
  };

  return (
    <>
      {loading && !error && <LoadingSpinner />}
      {!loading && error && <ErrorModal name={error.name} message={error.message} />}
      {products && (
        <>
          <FlexBox>
            <FlexBox flexWrap="wrap" justifyContent="start" flexDirection="row" order={1} flexBasis="75%">
              {products.map((product) => (
                <ProductCard key={product?.id} product={product} onBuy={handleBuy} m="4rem 3rem" />
              ))}
            </FlexBox>
            {/* <FlexBox order={2} flexBasis="25%" mt="2rem" height="fit-content">
              <ShoppingCart cartItems={cartItems} onUpdate={handleUpdate} onClear={handleClear} />
            </FlexBox> */}
          </FlexBox>
        </>
      )}
    </>
  );
}

export default Home;
