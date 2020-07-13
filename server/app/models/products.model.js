var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

const productsModel = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  addImage
}

function addImage (image, id) {
  return new Promise((resolve, reject) => {
    db.query(`update products set image_product = '${image}' where id_product =${id}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        console.log(error)
        reject(error.sqlMessage);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}
function addProduct (product) {
  try {
    console.log(product)
    const keys = Object.keys(product).join(',')
    let values = Object.values(product)
    values = values.map(v => {
      if (typeof v === 'string') v = `'${v}'`
      return v
    })

    console.log(`insert into products (${keys}) values (${values})`)

    return new Promise((resolve, reject) => {
      db.query(`insert into products (${keys}) values (${values})`, (error, rows, fields) => {
        if (!!error) {
          dbFunc.connectionRelease;
          console.log(error.sqlMessage)
          return reject(error.sqlMessage);
        } else {
          dbFunc.connectionRelease;
          return resolve(rows);
        }
      })
    })
  }
  catch (e) {
    console.log(e)
  }
}

function updateProduct (product) {
  const productId = product.id_product
  const keys = Object.keys(product)
  let values = Object.values(product)
  const updateRows = values.map((v, index) => {
    if (typeof v === 'string') v = `'${v}'`
    return `${keys[index]}=${v}`
  })
  return new Promise((resolve, reject) => {
    db.query(`update products set ${updateRows.join(',')}where id_product =${productId}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        console.log(error)
        reject(error.sqlMessage);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function deleteProduct (id) {
  return new Promise((resolve, reject) => {
    db.query(`delete from products where id_product=${id}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error.sqlMessage);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

function getProduct (id) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE id_product = ${id}`, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        console.log(error)
        reject(error.sqlMessage);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}
function getProducts () {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products `, (error, rows, fields) => {
      if (!!error) {
        dbFunc.connectionRelease;
        reject(error.sqlMessage);
      } else {
        dbFunc.connectionRelease;
        resolve(rows);
      }
    })
  })
}

module.exports = productsModel