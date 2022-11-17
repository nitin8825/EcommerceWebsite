const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /(.*)/ },
      // { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      //`${api}/products`,
      //`${api}/products/get/featured`,
      // `${api}/categories`,
      //`${api}/users/login`,
      //`${api}/users/register`,
      // `${api}/orders`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
