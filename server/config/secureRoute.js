const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
  var token = req.headers['token'];
  if (token) {
    jwt.verify(token, 'my_secret_key', (err, decode) => {
      if (err) {
        res.status(401).json({
          "message": "INVALID TOKEN",
          "error": err.message
        });
      } else {
        next();
      }
    })
  } else {
    res.status(401).json({
      "message": "NO TOKEN PROVIDED",
      "error": "token must be provide in header for endpoint access"
    });
  }
}


