/* eslint-disable no-console */
import '@testing-library/jest-dom';
import dotenv from 'dotenv-flow';
import { server } from './mockServer';

dotenv.config();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => {
  server.close();
});
afterEach(() => server.resetHandlers());
