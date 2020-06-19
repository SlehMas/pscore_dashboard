var productsModel = require('../models/products.model')

const productsService = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  addImage
}

function addImage (image, id) {
  return new Promise((resolve, reject) => {
    productsModel.addImage(image, id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
function addProduct (Product) {
  return new Promise((resolve, reject) => {
    productsModel.addProduct(Product).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function updateProduct (Product) {
  return new Promise((resolve, reject) => {
    productsModel.updateProduct(Product).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    productsModel.deleteProduct(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getProducts () {
  return new Promise((resolve, reject) => {
    productsModel.getProducts().then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getProduct (id) {
  return new Promise((resolve, reject) => {
    productsModel.getProduct(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = productsService