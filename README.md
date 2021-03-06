# Onboarding Case - Demo webshop

## Purpose

I developed this application during my onboarding at Euricom. The main goal of doing so, was to familiarze myself with different tools, techniques and programming concepts in order to deliver a fully operational CRUD application. A lot of attention was spent towards clean code.

Data is fictional and fetched from https://euricom-test-api.herokuapp.com/graphql.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) (or an alternative IDE such as Intellij)
- [Yarn](https://yarnpkg.com/) (an alternative to NPM)

## Available Scripts

```bash
# install all dependencies
$ yarn

# run with auto watch & relaunch
$ yarn start:watch

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

# unit tests
$ yarn test:watch
$ yarn test  # single run

See the section about https://facebook.github.io/create-react-app/docs/running-tests for more information.

# run eslint & tsc (type check)
$ yarn lint

# build to dist folder
$ yarn build

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about https://facebook.github.io/create-react-app/docs/deployment for more information.

```

## 3th Party Modules

- Testing:
  - [Jest](https://jestjs.io/) with Babel & TypeScript
  - [React Testing Library](https://testing-library.com/)
- Styling:
  - [Styled Components](https://styled-components.com/)
  - [Styled System](https://styled-system.com/)
- Forms: [react-hook-forms](https://react-hook-form.com/)
- Routing: [React Router](https://reactrouter.com/)
- Feedback: [React-hot-toast](https://react-hot-toast.com/)
- API:
  - [Apollo Client](https://www.apollographql.com/docs/react/)
- Dev Server: [Webpack](https://webpack.js.org/)

## Tech Stack

- [x] Basic Webpack app setup with TS transpiling and bundeling
- [x] Yarn Scripts: start, build, lint, test
- [x] ES linting with ESLint and [AirBnb Style Guide](https://github.com/airbnb/javascript)
- [x] Jest with babel-jest & React-testing-library
- [x] Apollo Client setup & Sample

## Features

- [x] Main layout and navigation
- [x] Data fetching and manipulation based on GraphQL
- [x] Product list (including sorting)
- [x] Product actions (new, edit existing, details, remove)
- [x] New product form
- [x] Edit product form
