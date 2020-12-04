const { createProxyMiddleware } = require('http-proxy-middleware');

// This file does not need to be imported anywhere. It is a magic file which will be loaded by
// "react-scripts start". https://create-react-app.dev/docs/proxying-api-requests-in-development/
// NOTE WELL: THIS ONLY APPLIES TO DEVELOPMENT SERVERS. DEPLOYMENT SERVERS ARE UNAFFECTED.

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080/',
      changeOrigin: true,
    })
  )
};
