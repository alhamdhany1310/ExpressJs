const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const controlProduct = require('../products_v2/controller');

router.get('/product', controlProduct.index);
router.post('/product', upload.single('image'), controlProduct.isiData);
router.get('/product/:id', controlProduct.detail);
router.put('/product/:id', upload.single('image'), controlProduct.update);
router.delete('/product/:id', upload.single('image'), controlProduct.hapus);

module.exports = router;
