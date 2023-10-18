const jwt = require("jsonwebtoken");

// нужна подпись для 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  generate(data) {
    return jwt.sign(data, JWT_SECRET, { expiresIn: "30d" });
  },
  verify(token) {
    // передаем сюда токен и наш 'секрет'
    return jwt.verify(token, JWT_SECRET);
  },
};
