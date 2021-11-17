module.exports = {
  // The name of the application
  name: 'TaskAPI',
  // The description of the application
  description: 'TaskAPI',
  // The version of the application
  version: '1.0.0',

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

  max_memory_restart: '1G',
  restart_delay: 100,
  exp_backoff_restart_delay: 100,

  // Restart the application if the any file changes
  watch: './',

  exec_mode: 'cluster',
  instances: '1',
};

// RUN npm install pm2 -g
// ENV PM2_PUBLIC_KEY 6cme7x5ca9g16p6
// ENV PM2_SECRET_KEY p22zaurea8fgylf

// CMD ["pm2-runtime", "app.js"]
