const express = require('express');
const app = express();
const path = require('path');
const productsRouter = require('./app/products/routes');
const productsRouterV2 = require('./app/products_v2/routes');
const logger = require('morgan');
// const port = process.env.PORT;

const indexRouter = require('./public/index');

app.use('/', indexRouter);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productsRouter);
app.use('/api/v2', productsRouterV2);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: 'failed',
    pesan: 'Resource' + req.originalUrl + ' tidak di temukan',
  });
});
// app.listen(port, () => console.log('Server : http://localhost:3000'));
