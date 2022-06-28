const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const log = require('./middlewares/logger');
const port = process.env.PORT || 3000;

app.use(log);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: 'failed',
    pesan: 'Resource' + req.originalUrl + ' tidak di temukan',
  });
});
app.listen(port, () => console.log('Server : http://localhost:3000'));
