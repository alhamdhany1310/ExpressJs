const fs = require('fs');
const Product = require('./model');
const path = require('path');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

// input data
const isiData = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({ users_id, name, price, stock, status, image_url: `https://task-expressjs.herokuapp.com/public/${image.originalname}` });
      res.send(result);
    } catch (er) {
      res.send(er);
    }
  }
};

//   menampilkan semua isi data
const index = async (req, res) => {
  const { search } = req.query;
  const result = await Product.findAll({ where: { [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { id: { [Op.like]: `%${search}%` } }] } });
  const results = await Product.findAll();
  if (search) {
    return res.send({
      status: 200,
      pesan: 'yeee, Berhasil',
      data: result,
    });
  } else {
    return res.send({
      status: 200,
      pesan: 'yeee, Berhasil',
      data: results,
    });
  }
};

//   menampilkan detail isi data berdasarkan ID
const detail = async (req, res) => {
  const id = req.params.id;
  const idPro = await Product.findByPk(id);
  if (!idPro) {
    return res.status(404).send({
      status: 404,
      pesan: 'wah idnya kosong nih atau tidak di temukan',
    });
  } else {
    return res.send({ status: 200, pesan: 'Id Berhasil ditemukan', data: idPro });
  }
};

//   edit atau update data
const update = async (req, res) => {
  const { usersId, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    await Product.update(
      {
        usersId,
        name,
        price,
        stock,
        status,
        imageUrl: `https://task-expressjs.herokuapp.com/public/${image.originalname}`,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({
      massage: 'Product Berhasil di Edit',
    });
  } catch (err) {
    res.send(err);
  }
};

//   Hapus data
const hapus = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Product Berhasil di hapus',
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  index,
  detail,
  isiData,
  update,
  hapus,
};
