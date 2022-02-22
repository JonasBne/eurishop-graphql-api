import { gql } from '@apollo/client';

const REMOVE_PRODUCT = gql`
  mutation REMOVE_PRODUCT($id: Int!) {
    deleteProduct(id: $id) {
      product {
        id
      }
    }
  }
`;

export default REMOVE_PRODUCT;
