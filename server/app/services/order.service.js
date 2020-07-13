const orderModel = require("../models/order.model")

const orderService = {
  getOrder,
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  addProductOrder,
  getProductOrder
}

function getProductOrder (orderId) {
  return new Promise((resolve, reject) => {
    orderModel.getProductOrder(orderId).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function addProductOrder (orderId, productId) {
  return new Promise((resolve, reject) => {
    orderModel.addProductOrder(orderId, productId).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getOrder (id) {
  return new Promise((resolve, reject) => {
    orderModel.getOrder(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
function deleteOrder(id) {
  return new Promise((resolve, reject) => {
    orderModel.deleteOrder(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function updateOrder(order) {
  return new Promise((resolve, reject) => {
    orderModel.updateOrder(order).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
function getOrders() {
  return new Promise((reslove, reject) => {
    orderModel.getOrders().then((data) => {
      reslove(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function addOrder(order) {
  return new Promise((resolve, reject) => {
    orderModel.addOrder(order).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
module.exports = orderService