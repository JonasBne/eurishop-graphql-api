import { act } from 'react-dom/test-utils';
import {
  BasketDTO,
  basketMapper,
  useGetBasket,
  useMutationBasketClear,
  useMutationBasketPatch,
  useMutationBasketPost,
  useMutationBasketRemoveItem,
} from './basketApi';
import Product from '../domain/product';
import { server } from '../mockServer';
import {
  clearBasket,
  clearBasketFailed,
  getBasket,
  patchBasket,
  patchBasketFailed,
  postItemToBasket,
  postItemToBasketFailed,
  removeItemFromBasket,
  removeItemFromBasketFailed,
} from '../tests/fixtures/basket';
import { renderHook, waitFor } from '../tests/utils';
import { getSingleProduct } from '../tests/fixtures/product';

describe('basket mapper', () => {
  let products: Product[];
  let basket: BasketDTO[];
  beforeEach(() => {
    products = [
      { id: 1, title: 'pellentesque' },
      { id: 2, title: 'ut' },
    ] as any;
    basket = [
      { id: 1, productId: 1, quantity: 1 },
      { id: 2, productId: 2, quantity: 4 },
    ];
  });
  test('basket mapper returns undefined if dto is undefined', () => {
    const result = basketMapper(products, undefined)!;
    expect(result).toBe(undefined);
  });
  test('basket mapper returns undefined if products is undefined', () => {
    const result = basketMapper(undefined, basket)!;
    expect(result).toBe(undefined);
  });
  test('basket mapper returns undefined if dto and products are undefined', () => {
    const result = basketMapper(undefined, undefined)!;
    expect(result).toBe(undefined);
  });
  test('basket mapper returns a cart with items', () => {
    const result = basketMapper(products, basket)!;
    expect(result.items.length).toBe(2);
    expect(result.items[0].quantity).toBe(1);
    expect(result.items[1].quantity).toBe(4);
    expect(result.items[0].product.title).toBe('pellentesque');
    expect(result.items[1].product.title).toBe('ut');
  });
});

describe('useGetBasket', () => {
  test('succesful query returns a basket', async () => {
    server.use(getSingleProduct, getBasket);

    const { result } = renderHook(() => useGetBasket());

    await waitFor(() => expect(result.current.cart?.items.length).toBeGreaterThan(0));

    expect(result.current.cart?.items[0]).toHaveProperty('product');
    expect(result.current.cart?.items[0]).toHaveProperty('quantity');
  });
});

describe('useMutation', () => {
  test('succesful post of product', async () => {
    server.use(postItemToBasket);

    const { result } = renderHook(() => useMutationBasketPost());

    act(() =>
      result.current.mutate({
        data: {
          quantity: 1,
        },
        productId: 1,
      }),
    );

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data).toEqual([
      {
        id: 1,
        productId: 1,
        quantity: 1,
      },
    ]);
  });

  test('failed post of product', async () => {
    server.use(postItemToBasketFailed());

    const { result } = renderHook(() => useMutationBasketPost());

    act(() =>
      result.current.mutate({
        data: {
          quantity: 1,
        },
        productId: 1,
      }),
    );

    await waitFor(() => expect(result.current.isError).toBeTruthy());
  });

  test('succesful patch of product', async () => {
    server.use(patchBasket);

    const { result } = renderHook(() => useMutationBasketPatch());

    act(() =>
      result.current.mutate({
        data: {
          quantity: 2,
        },
        productId: 1,
      }),
    );

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data).toEqual([
      {
        id: 1,
        productId: 1,
        quantity: 2,
      },
    ]);
  });

  test('failed patch of product', async () => {
    server.use(patchBasketFailed());

    const { result } = renderHook(() => useMutationBasketPatch());

    act(() =>
      result.current.mutate({
        data: {
          quantity: 2,
        },
        productId: 1,
      }),
    );

    await waitFor(() => expect(result.current.isError).toBeTruthy());
  });

  test('remove item from basket', async () => {
    server.use(removeItemFromBasket);

    const { result } = renderHook(() => useMutationBasketRemoveItem());

    act(() =>
      result.current.mutate({
        productId: 1,
      }),
    );

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data).toEqual([]);
  });

  test('failed remove item from basket', async () => {
    server.use(removeItemFromBasketFailed());

    const { result } = renderHook(() => useMutationBasketRemoveItem());

    act(() =>
      result.current.mutate({
        productId: 1,
      }),
    );

    await waitFor(() => expect(result.current.isError).toBeTruthy());
  });

  test('clear basket', async () => {
    server.use(clearBasket);

    const { result } = renderHook(() => useMutationBasketClear());

    act(() => result.current.mutate());

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data).toEqual([]);
  });

  test('failed clear basket', async () => {
    server.use(clearBasketFailed());

    const { result } = renderHook(() => useMutationBasketClear());

    act(() => result.current.mutate());

    await waitFor(() => expect(result.current.isError).toBeTruthy());
  });
});
