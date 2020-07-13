var express = require("express");
var app = express();
var path = require('path');
var db = require('./database');
var dbfunc = require('./db-function');
var bodyParser = require('body-parser');
var UserRoute = require('../app/routes/user.route');
var ArticleRoute = require('../app/routes/article.route')
var TestimoniesRoute = require('../app/routes/testimonies.route')
var OrderRoute = require('../app/routes/order.route')
var CommentsRoute = require('../app/routes/comments.route')
var AuthenticRoute = require('../app/routes/authentic.route');
var ProductsRoute = require('../app/routes/product.route')
var VolunteersRoute = require('../app/routes/volunteers.route')


var checkToken = require('./secureRoute');

// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('*/1 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

dbfunc.connectionCheck.then((data) => {
  //console.log(data);
}).catch((err) => {
  console.log(err);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json());

var router = express.Router();
app.use('/api', router);
AuthenticRoute.init(router);

var secureApi = express.Router();

//set static folder
app.use(express.static('app/uploads'))
// app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi', secureApi);
secureApi.use(checkToken);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// index route
app.get('/', (req, res) => {
  res.send('hello world');
});

var ApiConfig = {
  app: app
}

UserRoute.init(secureApi);
TestimoniesRoute.init(secureApi)
ArticleRoute.init(secureApi)
CommentsRoute.init(secureApi)
ProductsRoute.init(secureApi)
VolunteersRoute.init(secureApi)
OrderRoute.init(secureApi)

module.exports = ApiConfig;
