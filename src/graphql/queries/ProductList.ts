import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
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
