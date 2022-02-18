import { rest } from 'msw';
import config from '../../config';

//
// GET REQUESTS
//

export const getBasket = rest.get(config.serverUrl, (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json([
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

export const getBasketFailed = (errorCode = 404) =>
  rest.get(config.serverUrl, (req, res, ctx) => res(ctx.status(errorCode)));

//
// POST REQUESTS
//

export const postItemToBasket = rest.post(config.serverUrl, (req, res, ctx) =>
  res(
    ctx.status(201),
    ctx.json([
      {
        id: 1,
        productId: 1,
        quantity: 1,
      },
    ]),
  ),
);

export const postItemToBasketFailed = (errorCode = 404) =>
  rest.post(config.serverUrl, (req, res, ctx) => res(ctx.status(errorCode)));

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
