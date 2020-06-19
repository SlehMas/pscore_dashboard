var testimoniesModel = require('../models/testimonies.models')

const testimoniesService = {
  addTestimony,
  updateTestimony,
  deleteTestimony,
  getTestimonies,
  getTestimony
}

function addTestimony (testimony) {
  return new Promise((resolve, reject) => {
    testimoniesModel.addTestimony(testimony).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function updateTestimony (testimony) {
  return new Promise((resolve, reject) => {
    testimoniesModel.updateTestimony(testimony).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function deleteTestimony(id) {
  return new Promise((resolve, reject) => {
    testimoniesModel.deleteTestimoy(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getTestimonies () {
  return new Promise((resolve, reject) => {
    testimoniesModel.getTestimonies().then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function getTestimony (id) {
  return new Promise((resolve, reject) => {
    testimoniesModel.getTesitomy(id).then((data) => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = testimoniesService