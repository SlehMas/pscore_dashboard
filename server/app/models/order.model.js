var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const orderModel = {
  getOrders,
  addOrder,
  deleteOrder,
  updateOrder,
  getOrder,
  addProductOrder,
  getProductOrder
}


function getProductOrder(orderId) {

  return new Promise((resolve, reject) => {
    db.query(`SELECT P.* from products P 
    join order_products OP
    join orders O
    where OP.id_product = P.id_product 
    and OP.id_order = O.id_order
    and O.id_order = ${orderId}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        console.log(error)
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}
function addProductOrder(orderId, productId) {
  return new Promise((resolve, reject) => {
    db.query(`insert into order_products (id_order, id_product) values (${orderId}, ${productId})`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        console.log(error)
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function updateOrder(order) {
  const orderId = order.id_order

  const keys = Object.keys(order)
  let values = Object.values(order)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}`
  })

  return new Promise((resolve, reject) => {
    db.query(`update orders set ${updateRows.join(',')}where id_order =${orderId}`, (error, rows, fields) => {
      if (!!error) {
        console.log(error)
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function getOrders() {
  return new Promise((resolve, reject) => {
    db.query('SELECT O.*, U.username_user from orders O JOIN users U on U.id_user = O.id_user_order', (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function getOrder(id) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * from orders where id_order =' + id, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function deleteOrder(id) {
  return new Promise((resolve, reject) => {
    db.query(`delete from orders where id_order=${id}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}
function addOrder(order) {

  try {
    const keys = Object.keys(order).join(',')
    let values = Object.values(order)
    values = values.map(v => {
      if (typeof v === 'string') v = `'${v}'`
      return v
    })

    return new Promise((resolve, reject) => {
      db.query(`insert into orders(${keys}) values (${values})`, (error, rows, fields) => {
        if (!!error) {
          dbFunc.connectionRelease;
          console.log(error)
          reject(error);
        } else {
          dbFunc.connectionRelease;
          resolve(rows);
        }
      })
    })
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = orderModel

