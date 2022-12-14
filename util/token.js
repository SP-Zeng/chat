const jwt = require("jsonwebtoken");

const createToken = (user, expiration) => {
  return jwt.sign( // create the jwt token based on the user info
    {
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: expiration ? expiration : "2d",
    }
  );
};

const verifyToken = (token) => {
  return new Promise((resolve, _reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] },
      (err, _decoded) => {
        if (err) {
            resolve(false);
        } else {
            resolve(true);
        }
      }
    );
  });
};

const decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
}


module.exports = {
  createToken,
  verifyToken,
  decodeToken,
};