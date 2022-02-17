import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  GetAllProductsHomeQuery,
  GetBasketQuery,
  AddItemToCartMutation,
  MutationAddItemToBasketArgs,
} from '../../graphql/types';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import FlexBox from '../../components/FlexBox';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from './ProductCard';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
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

const GET_BASKET = gql`
  query getBasket {
    basket(checkoutID: "XYZ") {
      items {
        product {
          id
          title
          price
        }
        quantity
      }
    }
  }
`;

const ADD_ITEM_TO_BASKET = gql`
  mutation addItemToCart {
    addItemToBasket(input: { checkoutID: "XYZ", item: { productId: 4, quantity: 1 } }) {
      basket {
        items {
          product {
            id
            title
          }
        }
      }
    }
  }
`;

function Home() {
  // const { succesToast, failToast } = toasts();

  const {
    loading: productsIsLoading,
    error: productsError,
    data: productsData,
  } = useQuery<GetAllProductsHomeQuery>(GET_PRODUCTS);
  const products = productsData?.allProducts?.product ?? [];

  const { loading: basketIsLoading, error: basketError, data: basketData } = useQuery<GetBasketQuery>(GET_BASKET);
  const cartItems = basketData?.basket?.items ?? [];

  const [addItemToBasket, { data: addedItemData }] = useMutation<AddItemToCartMutation, MutationAddItemToBasketArgs>(
    ADD_ITEM_TO_BASKET,
  );
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

  const handleBuy = (productId: number) => {
    addItemToBasket();
  };

  const handleUpdate = (quantity: number, productId: string | number) => {
    console.log('update');
  };

  const handleClear = () => {
    console.log('clear');
  };

  return (
    <>
      {productsIsLoading || (basketIsLoading && !productsError && !basketError && <LoadingSpinner />)}
      {(!productsIsLoading && !basketIsLoading && productsError) ||
        (basketError && (
          <ErrorModal
            name={productsError?.name || basketError?.name}
            message={productsError?.message || basketError?.message}
          />
        ))}
      {products && (
        <FlexBox>
          <FlexBox flexWrap="wrap" justifyContent="start" flexDirection="row" order={1} flexBasis="75%">
            {products.map((product) => (
              <ProductCard key={product?.id} product={product} onBuy={handleBuy} m="4rem 3rem" />
            ))}
          </FlexBox>
          <FlexBox order={2} flexBasis="25%" mt="2rem" height="fit-content">
            <ShoppingCart cartItems={cartItems} onUpdate={handleUpdate} onClear={handleClear} />
          </FlexBox>
        </FlexBox>
      )}
    </>
  );
}

export default Home;
