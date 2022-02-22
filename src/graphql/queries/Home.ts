import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getAllProductsHome {
    allProducts {
      product {
        id
        title
        stocked
        image
        desc
        price
      }
    }
  }
`;

export const GET_BASKET = gql`
  query getBasket {
    basket(checkoutID: "XYZ") {
      items {
        product {
          id
          title
          price
        }
        quantity
      }
    }
  }
`;

export const ADD_ITEM_TO_BASKET = gql`
  mutation addItemToBasket($product: AddItemToBasketInput!) {
    addItemToBasket(input: $product) {
      basket {
        items {
          product {
            id
            title
          }
        }
      }
    }
  }
`;

export const CLEAR_BASKET = gql`
  mutation CLEAR_BASKET {
    clearBasket(checkoutID: "XYZ") {
      basket {
        checkoutID
      }
    }
  }
`;
