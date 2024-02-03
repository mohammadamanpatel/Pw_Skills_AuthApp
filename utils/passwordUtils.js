const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = process.env.secret;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        reject(null);
      } else {
        req.user = payload
      }
    });
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
};
