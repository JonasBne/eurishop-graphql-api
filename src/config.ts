const config = {
  nodeEnv: process.env.NODE_ENV,
  serverUrl: process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/',
};

export type Config = typeof config;

export default config;
