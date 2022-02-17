import { rest } from 'msw';
import { getUrl } from '../../api/productsApi';

const products = [
  {
    id: 1,
    title: 'pellentesque',
    sku: 'AAA',
    price: 10.0,
    basePrice: 10.0,
    image: 'https://dummyimage.com',
    desc: 'product 1 description',
  },
  {
    id: 2,
    title: 'ut',
    sku: 'BBB',
    price: 10.0,
    basePrice: 10.0,
    image: 'https://dummyimage.com',
    desc: 'product 2 description',
  },
  {
    id: 3,
    sku: 'CCC',
    price: 10.0,
    basePrice: 10.0,
    image: 'https://dummyimage.com',
    desc: 'product 3 description',
  },
];

export const getSingleProduct = rest.get(getUrl(`:productId`), (req, res, ctx) => {
  const product = products.find((item) => item.id === parseInt(req.params.productId as string, 10));
  if (!product) return res(ctx.status(404));
  return res(ctx.status(200), ctx.json(product));
});

export const getSingleProductFailed = (errorCode = 404) =>
  rest.get(getUrl(':productId'), (req, res, ctx) => res(ctx.status(errorCode)));

export const getAllProducts = rest.get(getUrl(), (req, res, ctx) =>
  res(
    ctx.json({
      selectedProducts: products,
    }),
  ),
);

export const getAllProductsEmpty = rest.get(getUrl(), (req, res, ctx) =>
  res(
    ctx.json({
      selectedProducts: [],
    }),
  ),
);

export const getAllProductsFailed = (errorCode = 404) =>
  rest.get(getUrl(), (req, res, ctx) => res(ctx.status(errorCode)));
