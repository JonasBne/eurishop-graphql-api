import { useQuery, useQueryClient, useMutation } from 'react-query';
import Product from '../domain/product';
import { CartItem, Cart } from '../domain/shoppingCart';
import api from './fetchHelper';
import { useGetMultipleProducts } from './productsApi';
import config from '../config';

export interface BasketDTO {
  id: number;
  productId: number;
  quantity: number;
}

export const getBaseUrl = () => `${config.serverUrl}api/basket/xyz`;

export const getUpdateUrl = (path?: string | number) => `${config.serverUrl}api/basket/xyz/${path}`;

export interface UpdateBasketVariables {
  productId: string | number;
  data: {
    quantity: number;
  };
}

export interface RemoveItemFromBasketVariables {
  productId?: string | number;
}

const postItemToBasket = async (productId: string | number, data: { quantity: number }) =>
  api.post(getUpdateUrl(`product/${productId}`), data);

const patchBasket = async (productId: string | number, data: { quantity: number }) =>
  api.patch(getUpdateUrl(`product/${productId}`), data);

const removeItemFromBasket = async (productId?: string | number) => api.remove(getUpdateUrl(`product/${productId}`));

const clearBasket = async () => api.remove(getBaseUrl());

export const basketMapper = (products?: Product[], basketDTO?: BasketDTO[]): Cart | undefined => {
  if (!basketDTO || !products) return undefined;

  const cartItems: CartItem[] = products.map((product) => ({
    product,
    quantity: basketDTO.find((item) => item.productId === product.id)!.quantity,
  }));
  return {
    items: cartItems,
  };
};

export const useGetBasket = () => {
  const { data, refetch: cartRefetch } = useQuery<BasketDTO[]>(['basket'], () => api.get(getBaseUrl()), {
    keepPreviousData: true,
  });

  const productIds = data?.map((cartItem) => cartItem.productId) ?? [];

  const { products } = useGetMultipleProducts(productIds, productIds.length > 0);

  return {
    cart: basketMapper(products, data),
    cartRefetch,
  };
};

export const useMutationBasketPost = () => {
  const queryClient = useQueryClient();
  return useMutation<BasketDTO, Error, UpdateBasketVariables>(
    ({ productId, data }) => postItemToBasket(productId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('basket');
      },
    },
  );
};

export const useMutationBasketPatch = () => {
  const queryClient = useQueryClient();
  return useMutation<BasketDTO, Error, UpdateBasketVariables>(({ productId, data }) => patchBasket(productId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('basket');
    },
  });
};

export const useMutationBasketRemoveItem = () => {
  const queryClient = useQueryClient();
  return useMutation<BasketDTO, Error, RemoveItemFromBasketVariables>(
    ({ productId }) => removeItemFromBasket(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('basket');
      },
    },
  );
};

export const useMutationBasketClear = () => {
  const queryClient = useQueryClient();
  return useMutation<BasketDTO, Error>(() => clearBasket(), {
    onSuccess: () => {
      queryClient.invalidateQueries('basket');
    },
  });
};
