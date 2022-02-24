import { graphql } from 'msw';

const products = [
  {
    id: 1,
    title: 'pellentesque',
    sku: 'AAA',
    price: 10.0,
    basePrice: 10.0,
    image: 'https://dummyimage.com',
    desc: 'product 1 description',
    stocked: true,
  },
  {
    id: 2,
    title: 'ut',
    sku: 'BBB',
    price: 10.0,
    basePrice: 10.0,
    image: 'https://dummyimage.com',
    desc: 'product 2 description',
    stocked: true,
  },
  {
    id: 3,
    sku: 'CCC',
    title: 'et',
    price: 10.0,
    basePrice: 10.0,
    image: 'https://dummyimage.com',
    desc: 'product 3 description',
    stocked: true,
  },
];

export const getSingleProduct = graphql.query('getSingleProduct', (req, res, ctx) => {
  const { productId } = req.variables;
  return res(
    ctx.status(200),
    ctx.data({
      product: {
        id: productId,
        title: 'product',
      },
    }),
  );
});

export const getSingleProductFailed = (errorCode = 404) =>
  graphql.query('getSingleProduct', (req, res, ctx) =>
    res(
      ctx.errors([
        {
          message: `Failed to load single product with errorcode ${errorCode}`,
        },
      ]),
    ),
  );

export const getAllProductsHome = graphql.query('getAllProductsHome', (req, res, ctx) =>
  res(
    ctx.data({
      allProducts: {
        product: products,
      },
    }),
  ),
);

export const getAllProductsList = graphql.query('getAllProductsList', (req, res, ctx) =>
  res(
    ctx.data({
      allProducts: {
        product: products,
      },
    }),
  ),
);

export const getAllProductsEmpty = graphql.query('getAllProducts', (req, res, ctx) =>
  res(
    ctx.data({
      products: [],
    }),
  ),
);

export const getAllProductsListFailed = graphql.query('getAllProductsList', (req, res, ctx) => res(ctx.status(404)));

export const getAllProductsHomeFailed = (errorCode = 404) =>
  graphql.query('getAllProductsHome', (req, res, ctx) =>
    res(
      ctx.errors([
        {
          message: `Failed to load products on homepage with errorcode ${errorCode}`,
        },
      ]),
    ),
  );
