module.exports = {
  // The name of the application
  name: 'TaskAPI',
  // The description of the application
  description: 'TaskAPI',
  // The version of the application
  version: '1.0.0',
  // The port of the application
  port: 5000,
  // The base url of the application
  baseUrl: 'http://localhost:5000',
  // The base path of the application
  basePath: '/api',

  // The path of the application
  script: 'server/api/server.js',
  env_prod: {
    NODE_ENV: 'production',
  },
  env_dev: {
    NODE_ENV: 'development',
  },
  env_test: {
    NODE_ENV: 'test',
  },

  max_memory_restart: '60M',
  restart_delay: 100,
  exp_backoff_restart_delay: 100,

  // Restart the application if the any file changes
  watch: './',

  exec_mode: 'cluster',
  instances: 'max',
};
