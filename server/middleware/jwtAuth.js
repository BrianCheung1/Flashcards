const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  let token = jwt.sign(data, process.env.TOKEN_SECRET, {});
  return token;
}

function generateResetToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "15m" });
}

async function authenticateResetToken(req, res, next) {
  const { token } = req.body;

  if (token === undefined)
    return res.status(401).send({ message: "Undefined JWT token" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      // console.log("JWT Token Error:", err.response ? err.response.data : err)
      return res.status(403).send({ message: "Bad JWT token" });
    }

    req.data = data;
    next();
  });
}

function authenticateToken(req, res, next) {
  if (!req.headers.cookie) {
    return res.status(401).send({ message: "Undefined JWT token" });
  }
  const token = req.headers.cookie.replace("token=", "");
  if (token === undefined)
    return res.status(401).send({ message: "Undefined JWT token" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, email) => {
    if (err) {
      console.log("JWT Token Error:", err.response ? err.response.data : err);
      return res.status(403).send({ message: "Bad JWT token" });
    }

    //req.email = email;
    next();
  });
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  generateResetToken,
  authenticateResetToken,
};
