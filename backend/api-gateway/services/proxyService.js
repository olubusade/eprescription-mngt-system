const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyService = (targetUrl) => {
    return createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        onProxyReq: (proxyReq) => proxyReq.setHeader('x-api-key', process.env.API_KEY)
    });
};

module.exports = proxyService;
