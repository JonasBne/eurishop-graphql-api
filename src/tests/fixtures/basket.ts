import { graphql } from 'msw';

//
// GET REQUESTS
//

export const getBasket = graphql.query('getBasket', (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.data([
      {
        id: 1,
        productId: 1,
        quantity: 1,
      },
      {
        id: 2,
        productId: 2,
        quantity: 1,
      },
      {
        id: 3,
        productId: 3,
        quantity: 1,
      },
    ]),
  ),
);

export const getBasketFailed = graphql.query('getBasket', (req, res, ctx) =>
  res(
    ctx.errors([
      {
        message: 'Failed to load basket',
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

export const postItemToBasketFailed = graphql.mutation('addItemToBasket', (req, res, ctx) =>
  res(
    ctx.errors([
      {
        message: 'Failed to post item',
      },
    ]),
  ),
);

//
// DELETE REQUESTS
//

export const removeItemFromBasket = rest.delete(config.serverUrl, (req, res, ctx) => res(ctx.json([])));

export const removeItemFromBasketFailed = (errorCode = 404) =>
  rest.delete(config.serverUrl, (req, res, ctx) => res(ctx.status(errorCode)));

export const clearBasket = rest.delete(config.serverUrl, (req, res, ctx) => res(ctx.json([])));

export const clearBasketFailed = (errorCode = 404) =>
  rest.delete(config.serverUrl, (req, res, ctx) => res(ctx.status(errorCode)));

//
// PATCH REQUESTS
//

export const patchBasket = rest.patch(config.serverUrl, (req, res, ctx) =>
  res(
    ctx.json([
      {
        id: 1,
        productId: 1,
        quantity: 2,
      },
    ]),
  ),
);

export const patchBasketFailed = (errorCode = 404) =>
  rest.patch(config.serverUrl, (req, res, ctx) => res(ctx.status(errorCode)));
