import { gql } from '@apollo/client';
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

const GET_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: Int) {
    product(id: $productId) {
      id
      sku
      title
      desc
      image
      stocked
      basePrice
      price
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    allProducts {
      id
      sku
      title
      desc
      image
      stocked
      basePrice
      price
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getAllProductsList {
    allProducts {
      product {
        id
        sku
        title
        desc
        image
        stocked
        basePrice
        price
      }
    }
  }
`;

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

export const getSingleProductFailed = graphql.query('getSingleProduct', (req, res, ctx) =>
  res(
    ctx.errors([
      {
        message: 'Failed to load product',
      },
    ]),
  ),
);

export const getAllProductsHome = graphql.query('getAllProductsHome', (req, res, ctx) =>
  res(
    ctx.data({
      products,
    }),
  ),
);

export const getAllProductsList = graphql.query('getAllProductsList', (req, res, ctx) =>
  res(
    ctx.data({
      products,
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

export const getAllProductsFailed = graphql.query('getAllProducts', (req, res, ctx) =>
  res(
    ctx.errors([
      {
        message: 'Failed to load products',
      },
    ]),
  ),
);
