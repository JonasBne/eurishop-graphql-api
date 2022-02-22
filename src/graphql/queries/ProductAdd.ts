import { gql } from '@apollo/client';

const UPDATE_PRODUCT = gql`
  mutation addOrUpdateProduct($product: ProductInput!) {
    addOrUpdateProduct(input: $product) {
      product {
        id
      }
    }
  }
`;

export default UPDATE_PRODUCT;
