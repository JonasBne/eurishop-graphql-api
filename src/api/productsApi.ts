/* eslint-disable import/no-cycle */
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import api from './fetchHelper';
import Product from '../domain/product';

import config from '../config';

export interface ProductDTO {
  id: number;
  sku: string;
  title: string;
  desc: string;
  image: string;
  stocked: boolean;
  basePrice: number;
  price: number;
}

export interface ProductsDTO {
  total: number;
  page: number;
  pageSize: number;
  selectedProducts: ProductDTO[];
}

export interface PutProductVariables {
  productId: string | number;
  product: ProductDTO;
}

export interface RemoveProductVariables {
  productId: string | number;
}

export const productUrl = 'api/products';

export const getUrl = (path?: string | number) => {
  if (path) return `${config.serverUrl}api/products/${path}`;
  return `${config.serverUrl}api/products`;
};

export const productKeys = {
  all: ['products'],
  paged: (page: number) => [...productKeys.all, { page }],
  detail: (productId: string | number) => [...productKeys.all, { productId }],
};

const productMapper = (dto?: ProductDTO): Product | undefined => {
  if (!dto) return undefined;
  return {
    ...dto,
  };
};

const postProduct = async (data: any) => api.post(getUrl(), data);

const putProduct = async (productId: string | number, data: any) =>
  api.put(`${config.serverUrl}${productUrl}/${productId}`, data);

const removeProduct = async (productId: string | number) => api.remove(getUrl(productId));

export const useGetProduct = (productId: string) => {
  const url = `${config.serverUrl}${productUrl}/${productId}`;

  const { isLoading, isError, data, error } = useQuery<ProductDTO, Error>(
    [productKeys.detail(productId), productId],
    () => api.get(url),
    { keepPreviousData: true },
  );

  return {
    isLoading,
    isError,
    error,
    product: productMapper(data),
  };
};

export const useGetProducts = (page = 0) => {
  const url = getUrl(`?page=${page}`);
  const { isLoading, isError, data, error, refetch } = useQuery<ProductsDTO, Error>(
    [productKeys.paged(page), page],
    () => api.get(url),
  );

  return {
    isLoading,
    isError,
    error,
    products: data?.selectedProducts.map((product: ProductDTO) => productMapper(product)!),
    refetch,
  };
};

export const useGetMultipleProducts = (productIds: string[] | number[], enabled: boolean) => {
  const urls = productIds.map((productId) => getUrl(productId));

  const productQueries = useQueries(
    urls.map((url) => ({
      queryKey: ['product', url],
      queryFn: () => api.get(url),
      enabled,
    })),
  );

  const products = productQueries.map((product) => product.data);
  return {
    isLoading: !!productQueries.some((query) => query.isLoading),
    isError: !!productQueries.some((query) => query.isError),
    error: productQueries.find((query) => query.error !== undefined),
    products: productQueries.some((query) => query.isLoading) ? [] : products,
  };
};

export const useMutationProductPost = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductDTO, Error, ProductDTO>((product) => postProduct(product), {
    onSuccess: () => {
      queryClient.invalidateQueries(productKeys.all);
    },
  });
};

export const useMutationProductPut = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductDTO, Error, PutProductVariables>(
    ({ productId, product }) => putProduct(productId, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(productKeys.all);
      },
    },
  );
};

export const useMutationProductRemove = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductDTO, Error, RemoveProductVariables>(({ productId }) => removeProduct(productId), {
    onSuccess: () => {
      queryClient.invalidateQueries(productKeys.all);
    },
  });
};
