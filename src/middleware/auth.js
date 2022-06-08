require("dotenv/config");
const jwt = require("jsonwebtoken");

const getAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "Falha na autenticação" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Permissões inválidas" });
  }
};

module.exports = getAuth;
