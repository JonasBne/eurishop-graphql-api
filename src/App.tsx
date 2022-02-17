import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import theme from './theme/theme';
import Navbar from './views/Navigation/Navbar';
import Home from './views/Home/Home';
import ProductEdit from './views/ProductDetail/ProductEdit';
import ProductList from './views/ProductList/ProductList';
import GlobalStyle from './theme/globalStyle';
import ProductAdd from './views/ProductDetail/ProductAdd';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="products/admin" element={<ProductList />} />
          <Route path="products/:productId/edit" element={<ProductEdit />} />
          <Route path="products/new" element={<ProductAdd />} />
        </Routes>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
