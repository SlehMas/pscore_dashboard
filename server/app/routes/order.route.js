const orderService = require('../services/order.service')

function init(router) {
  router.route('/order')
    .get(getOrders)
    .post(addOrder)
    .put(updateOrder)

  router.route('/order/:id')
    .get(getOrder)
    .delete(deleteOrder)

  router.route('/order/:id/products')
    .get(getProductOrder)

  router.route('/order/:oid/product/:pid')
    .post(addProductOrder)

}

function getProductOrder(req, res) {
  const orderId = req.params.id;

  orderService.getProductOrder(orderId).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function addProductOrder(req, res) {
  const orderId = req.params.oid
  const productId = req.params.pid

  orderService.addProductOrder(orderId, productId).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function getOrder(req, res) {
  const id = req.params.id
  orderService.getOrder(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function deleteOrder(req, res) {
  const id = req.params.id
  orderService.deleteOrder(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}
function updateOrder(req, res) {
  const oldOrder = req.body
  orderService.updateOrder(oldOrder).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}
function getOrders(req, res) {
  orderService.getOrders().then(data => {
    console.log(data)
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function addOrder(req, res) {
  const newOrder = req.body
  console.log(newOrder)
  orderService.addOrder(newOrder).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

module.exports.init = init