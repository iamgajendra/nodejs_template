const jwt = require("jsonwebtoken");

exports.generate = function (details) {
  return new Promise((resolve, reject) => {
    jwt.sign(details, process.env.JWT_SECRET, { algorithm: "HS256" }, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
