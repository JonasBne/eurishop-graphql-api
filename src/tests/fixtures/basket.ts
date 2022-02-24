import { graphql } from 'msw';

//
// GET REQUESTS
//

export const getBasket = graphql.query('getBasket', (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.data({
      basket: {
        items: [
          {
            product: {
              id: 1,
              title: 'product1',
              productId: 1,
              price: 10.0,
            },
            quantity: 1,
          },
          {
            product: {
              id: 2,
              title: 'product',
              productId: 1,
              price: 10.0,
            },
            quantity: 1,
          },
        ],
      },
    }),
  ),
);

export const getBasketFailed = (errorCode = 404) =>
  graphql.query('getBasket', (req, res, ctx) =>
    res(
      ctx.errors([
        {
          message: `Failed to load basket with errorcode ${errorCode}`,
        },
      ]),
    ),
  );

//
// POST REQUESTS
//

export const postItemToBasket = graphql.mutation('addItemToBasket', (req, res, ctx) =>
  res(
    ctx.data({
      product: {
        id: 1,
        productId: 1,
        quantity: 1,
      },
    }),
  ),
);

export const postItemToBasketFailed = (errorCode = 400) =>
  graphql.mutation('addItemToBasket', (req, res, ctx) =>
    res(
      ctx.errors([
        {
          message: `Failed to add item to basket with errorcode ${errorCode}`,
        },
      ]),
    ),
  );

//
// DELETE REQUESTS
//

export const removeItemFromBasket = graphql.mutation('removeItemFromBasket', (req, res, ctx) => res(ctx.status(200)));

export const removeItemFromBasketFailed = (errorCode = 404) =>
  graphql.mutation('removeItemFromBasket', (req, res, ctx) =>
    res(
      ctx.errors([
        {
          message: `Failed to remove item from basket with errorcode ${errorCode}`,
        },
      ]),
    ),
  );

export const clearBasket = graphql.mutation('clearBasket', (req, res, ctx) => res(ctx.status(200)));

export const clearBasketFailed = (errorCode = 404) =>
  graphql.mutation('clearBasket', (req, res, ctx) =>
    res(
      ctx.errors([
        {
          message: `Failed to clear basket with errorcode ${errorCode}`,
        },
      ]),
    ),
  );
