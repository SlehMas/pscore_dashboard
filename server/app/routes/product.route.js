const productsService = require('../services/product.service')
const multer  = require('multer')
const path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage })
const fs = require('fs')

function init (router) {
  router.route('/product')
    .get(getProducts)
    .post(addProduct)
    .put(updateProducts)
  router.route('/product/image')
    .post(upload.single('image'), addImage)

  router.route('/product/:id')
    .get(getProduct)
    .delete(deleteProducts)
}

function addImage (req, res) {
  const fileName = req.file.filename
  const updateId = req.body.id
  productsService.addImage(fileName, updateId).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}
function getProducts (req, res) {
  productsService.getProducts().then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function getProduct (req, res) {
  const id = req.params.id
  productsService.getProduct(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function addProduct (req, res) {
  let newProduct = req.body
  console.log(newProduct)
  // TODO: add currentUser from token
  productsService.addProduct(newProduct).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function updateProducts (req, res) {
  const oldProduct = req.body
 
  productsService.updateProduct(oldProduct).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function deleteProducts (req, res) {
  const id = req.params.id

  productsService.deleteProduct(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });

}
module.exports.init = init