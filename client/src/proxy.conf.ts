const proxyConfig = [
{
  "/api/*": {
    "target": "http://localhost:8000",
    "secure": false,
    "pathRewrite": {
      "^/api/*": ""
    },
    "logLevel": "debug",
    "changeOrigin": true
  }
}
];

module.exports = proxyConfig;
