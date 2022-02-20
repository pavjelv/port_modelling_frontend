const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static(__dirname + '/dist/port-modelling-fe'));

app.use(morgan('dev'));

// Proxy endpoints
app.use('/api', createProxyMiddleware({
  target: process.env.BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^/api`]: '',
  },
}));
app.use('/files/images', createProxyMiddleware( {
    target: process.env.BACKEND_URL,
    changeOrigin: true
}));
app.get('/*', (req,res,next) => {
  res.sendFile(path.join(__dirname + '/dist/port-modelling-fe/index.html'));
});

app.listen(process.env.PORT || 8000);
