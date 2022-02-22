/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  DateTime: string;
};

export type AddItemToBasketInput = {
  checkoutID: Scalars['ID'];
  item: BasketItemInput;
};

export type AddItemToBasketPayload = {
  __typename?: 'AddItemToBasketPayload';
  basket?: Maybe<Basket>;
};

export type AddOrUpdateProductPayload = {
  __typename?: 'AddOrUpdateProductPayload';
  product?: Maybe<Product>;
};

export type AddOrUpdateUserPayload = {
  __typename?: 'AddOrUpdateUserPayload';
  user?: Maybe<User>;
};

export type AddTaskPayload = {
  __typename?: 'AddTaskPayload';
  task?: Maybe<Task>;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type Basket = {
  __typename?: 'Basket';
  checkoutID?: Maybe<Scalars['ID']>;
  items?: Maybe<Array<Maybe<BasketItem>>>;
};

export type BasketItem = {
  __typename?: 'BasketItem';
  id?: Maybe<Scalars['ID']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
};

export type BasketItemInput = {
  productId: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type ClearBasketPayload = {
  __typename?: 'ClearBasketPayload';
  basket?: Maybe<Basket>;
};

export type CompleteTaskPayload = {
  __typename?: 'CompleteTaskPayload';
  task?: Maybe<Task>;
};

export type DeleteProductPayload = {
  __typename?: 'DeleteProductPayload';
  product?: Maybe<Product>;
};

export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  task?: Maybe<Task>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Add product to basket
   * 1. If the product already exist in the basket the quantity is added
   * 2. Product not found: ERROR
   * 3. Product not in stock: ERROR
   */
  addItemToBasket?: Maybe<AddItemToBasketPayload>;
  /** Create or save a product */
  addOrUpdateProduct?: Maybe<AddOrUpdateProductPayload>;
  addOrUpdateUser?: Maybe<AddOrUpdateUserPayload>;
  addTask?: Maybe<AddTaskPayload>;
  /** Empty the basket */
  clearBasket?: Maybe<ClearBasketPayload>;
  completeTask?: Maybe<CompleteTaskPayload>;
  /** Remove a product */
  deleteProduct?: Maybe<DeleteProductPayload>;
  deleteTask?: Maybe<DeleteTaskPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Remove the product from the basket */
  removeItemFromBasket?: Maybe<RemoveItemFromBasketPayload>;
};

export type MutationAddItemToBasketArgs = {
  input: AddItemToBasketInput;
};

export type MutationAddOrUpdateProductArgs = {
  input: ProductInput;
};

export type MutationAddOrUpdateUserArgs = {
  input: UserInput;
};

export type MutationAddTaskArgs = {
  desc: Scalars['String'];
};

export type MutationClearBasketArgs = {
  checkoutID?: InputMaybe<Scalars['ID']>;
};

export type MutationCompleteTaskArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteTaskArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type MutationRemoveItemFromBasketArgs = {
  input: RemoveItemFromBasketInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  basePrice?: Maybe<Scalars['Float']>;
  desc?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
  stocked?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  pageInfo: PageInfo;
  product?: Maybe<Array<Maybe<Product>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor: Scalars['String'];
  node?: Maybe<Product>;
};

export type ProductInput = {
  basePrice?: InputMaybe<Scalars['Float']>;
  desc?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  sku: Scalars['String'];
  stocked?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allProducts?: Maybe<ProductConnection>;
  allUsers?: Maybe<UserConnection>;
  basket?: Maybe<Basket>;
  product?: Maybe<Product>;
  task?: Maybe<Task>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  user?: Maybe<User>;
};

export type QueryAllProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
};

export type QueryAllUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
};

export type QueryBasketArgs = {
  checkoutID: Scalars['String'];
};

export type QueryProductArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type QueryTaskArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type RemoveItemFromBasketInput = {
  checkoutID: Scalars['ID'];
  productId: Scalars['Int'];
};

export type RemoveItemFromBasketPayload = {
  __typename?: 'RemoveItemFromBasketPayload';
  basket?: Maybe<Basket>;
};

export type Task = {
  __typename?: 'Task';
  completed?: Maybe<Scalars['Boolean']>;
  desc?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  age?: Maybe<Scalars['Int']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
  user?: Maybe<Array<Maybe<User>>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserInput = {
  address?: InputMaybe<AddressInput>;
  age?: InputMaybe<Scalars['Int']>;
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type GetAllProductsHomeQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProductsHomeQuery = {
  __typename?: 'Query';
  allProducts?: {
    __typename?: 'ProductConnection';
    product?: Array<{
      __typename?: 'Product';
      id?: number | null;
      title?: string | null;
      stocked?: boolean | null;
      image?: string | null;
      desc?: string | null;
      price?: number | null;
    } | null> | null;
  } | null;
};

export type GetBasketQueryVariables = Exact<{ [key: string]: never }>;

export type GetBasketQuery = {
  __typename?: 'Query';
  basket?: {
    __typename?: 'Basket';
    items?: Array<{
      __typename?: 'BasketItem';
      quantity?: number | null;
      product?: { __typename?: 'Product'; id?: number | null; title?: string | null; price?: number | null } | null;
    } | null> | null;
  } | null;
};

export type AddItemToBasketMutationVariables = Exact<{
  product: AddItemToBasketInput;
}>;

export type AddItemToBasketMutation = {
  __typename?: 'Mutation';
  addItemToBasket?: {
    __typename?: 'AddItemToBasketPayload';
    basket?: {
      __typename?: 'Basket';
      items?: Array<{
        __typename?: 'BasketItem';
        product?: { __typename?: 'Product'; id?: number | null; title?: string | null } | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Clear_BasketMutationVariables = Exact<{ [key: string]: never }>;

export type Clear_BasketMutation = {
  __typename?: 'Mutation';
  clearBasket?: {
    __typename?: 'ClearBasketPayload';
    basket?: { __typename?: 'Basket'; checkoutID?: string | null } | null;
  } | null;
};

export const GetAllProductsHomeDocument = gql`
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
export type GetAllProductsHomeQueryResult = Apollo.QueryResult<
  GetAllProductsHomeQuery,
  GetAllProductsHomeQueryVariables
>;
export const GetBasketDocument = gql`
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
export type GetBasketQueryResult = Apollo.QueryResult<GetBasketQuery, GetBasketQueryVariables>;
export const AddItemToBasketDocument = gql`
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
export type AddItemToBasketMutationFn = Apollo.MutationFunction<
  AddItemToBasketMutation,
  AddItemToBasketMutationVariables
>;
export type AddItemToBasketMutationResult = Apollo.MutationResult<AddItemToBasketMutation>;
export type AddItemToBasketMutationOptions = Apollo.BaseMutationOptions<
  AddItemToBasketMutation,
  AddItemToBasketMutationVariables
>;
export const Clear_BasketDocument = gql`
  mutation CLEAR_BASKET {
    clearBasket(checkoutID: "XYZ") {
      basket {
        checkoutID
      }
    }
  }
`;
export type Clear_BasketMutationFn = Apollo.MutationFunction<Clear_BasketMutation, Clear_BasketMutationVariables>;
export type Clear_BasketMutationResult = Apollo.MutationResult<Clear_BasketMutation>;
export type Clear_BasketMutationOptions = Apollo.BaseMutationOptions<
  Clear_BasketMutation,
  Clear_BasketMutationVariables
>;
