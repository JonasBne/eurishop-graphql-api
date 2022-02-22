import { gql } from '@apollo/client';

export const REMOVE_PRODUCT = gql`
  mutation REMOVE_PRODUCT($id: Int!) {
    deleteProduct(id: $id) {
      product {
        id
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation addOrUpdateProduct($product: ProductInput!) {
    addOrUpdateProduct(input: $product) {
      product {
        id
      }
    }
  }
`;
