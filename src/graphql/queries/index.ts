import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
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

export const GET_SINGLE_PRODUCT = gql`
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
