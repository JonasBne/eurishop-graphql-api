import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  GetAllProductsHomeQuery,
  GetBasketQuery,
  AddItemToBasketMutation,
  AddItemToBasketMutationVariables,
  Clear_BasketMutation,
  BasketItem,
  RemoveItemFromBasketMutation,
  RemoveItemFromBasketMutationVariables,
} from '../../graphql/types';
import {
  GET_PRODUCTS,
  GET_BASKET,
  ADD_ITEM_TO_BASKET,
  CLEAR_BASKET,
  REMOVE_ITEM_FROM_BASKET,
} from '../../graphql/queries/Home';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import FlexBox from '../../components/FlexBox';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from './ProductCard';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import toasts from '../../components/toasts';

function Home() {
  const { succesToast, failToast } = toasts();

  const {
    loading: productsIsLoading,
    error: productsError,
    data: productsData,
  } = useQuery<GetAllProductsHomeQuery>(GET_PRODUCTS);
  const products = productsData?.allProducts?.product ?? [];

  const { loading: basketIsLoading, error: basketError, data: basketData } = useQuery<GetBasketQuery>(GET_BASKET);
  const cartItems: BasketItem[] | any[] = basketData?.basket?.items ?? [];

  const [addItemToBasket, { error: addedItemError, data: addedItemData }] = useMutation<
    AddItemToBasketMutation,
    AddItemToBasketMutationVariables
  >(ADD_ITEM_TO_BASKET, {
    refetchQueries: [
      {
        query: GET_BASKET,
      },
    ],
  });

  const [clearBasket, { error: clearBasketError }] = useMutation<Clear_BasketMutation>(CLEAR_BASKET, {
    refetchQueries: [
      {
        query: GET_BASKET,
      },
    ],
  });

  const [removeItem, { error: removeItemError, data: removedItemData }] = useMutation<
    RemoveItemFromBasketMutation,
    RemoveItemFromBasketMutationVariables
  >(REMOVE_ITEM_FROM_BASKET, {
    refetchQueries: [
      {
        query: GET_BASKET,
      },
    ],
  });

  useEffect(() => {
    if (addedItemError) {
      failToast(addedItemError.message);
    }
    if (removeItemError) {
      failToast(removeItemError.message);
    }
    if (clearBasketError) {
      failToast(clearBasketError.message);
    }
    if (addedItemData?.addItemToBasket?.basket) {
      succesToast('Success!');
    }
    if (removedItemData?.removeItemFromBasket?.basket) {
      succesToast('Success!');
    }
  }, [addedItemError, removeItemError, clearBasketError, addedItemData, removedItemData]);

  const handleBuy = (productId: number) => {
    addItemToBasket({
      variables: {
        product: {
          checkoutID: 'XYZ',
          item: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  };

  const handleRemoveItem = (productId: number) => {
    removeItem({
      variables: {
        basket: {
          checkoutID: 'XYZ',
          productId,
        },
      },
    });
  };

  const handleClear = () => {
    clearBasket();
  };

  return (
    <>
      {productsIsLoading && !productsError && <LoadingSpinner />}
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
            <ShoppingCart cartItems={cartItems} onClear={handleClear} onRemove={handleRemoveItem} />
          </FlexBox>
        </FlexBox>
      )}
    </>
  );
}

export default Home;
