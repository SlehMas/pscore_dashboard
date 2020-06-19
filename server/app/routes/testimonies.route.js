const testimoniesService = require('../services/testimonies.service')


function init (router) {
  router.route('/testimony')
    .get(getTestimonies)
    .post(addTestimony)
    .put(updateTestimonies)

  router.route('/testimony/:id')
    .get(getTestimony)
    .delete(deleteTestimonies)
}

function getTestimonies (req, res) {
  testimoniesService.getTestimonies().then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function getTestimony (req, res) {
  const id = req.params.id
  testimoniesService.getTestimony(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function addTestimony (req, res) {
  const newTestimony = req.body

  testimoniesService.addTestimony(newTestimony).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function updateTestimonies (req, res) {
  const oldTestimony = req.body
 
  testimoniesService.updateTestimony(oldTestimony).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });
}

function deleteTestimonies (req, res) {
  const id = req.params.id

  testimoniesService.deleteTestimony(id).then(data => {
    res.send(data)
  }).catch((err) => {
    res.send(err);
  });

}
module.exports.init = init