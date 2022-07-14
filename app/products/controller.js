const connection = require('../../config/mysql');
const fs = require('fs');
const path = require('path');

// menampilkan semua isi data
const index = (req, res) => {
  const { search } = req.query;
  let eks = {};
  if (search) {
    eks = {
      sql: 'SELECT * FROM products WHERE name LIKE ?',
      values: [`%${search}%`],
    };
  } else {
    eks = {
      sql: 'SELECT * FROM products',
    };
  }
  connection.query(eks, _response(res));
};

// menampilkan detail ID
const detail = (req, res) => {
  connection.query(
    {
      sql: 'SELECT * FROM products WHERE id = ?',
      values: [req.params.id],
    },
    _response(res)
  );
};

// update Data atau menambah data
const store = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    connection.query(
      {
        sql: 'INSERT INTO products (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        values: [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`],
      },
      _response(res)
    );
  }
};

// edit atau update data
const update = (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  let sql = '';
  let values = [];
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?';
    values = [parseInt(users_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id];
  } else {
    sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?';
    values = [parseInt(users_id), name, price, stock, status, req.params.id];
  }

  connection.query({ sql, values }, _response(res));
};

// delete Data
const hapus = (req, res) => {
  connection.query(
    {
      sql: 'DELETE  FROM products WHERE id = ?',
      values: [req.params.id],
    },
    _response(res)
  );
};

// menampilkan Respons
const _response = (res) => {
  return (error, results) => {
    console.log(error);
    if (error) {
      res.send({
        status: 'failed',
        response: error,
      });
    } else {
      res.send({
        status: 'success',
        response: results,
      });
    }
  };
};

module.exports = {
  index,
  detail,
  store,
  update,
  hapus,
};
