require("dotenv/config");
const jwt = require("jsonwebtoken");

const getAuth = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ msg: "Token de autenticação não existente" });
  }

  const parts = authToken.split(" ");

  if (parts.length !== 2) {
    return res
      .status(401)
      .send({ erro: "Token de autenticação sem ambas as partes" });
  }

  const [prefix, token] = parts;
  if (!/^Bearer_pp$/i.test(prefix))
    return res
      .status(401)
      .send({ erro: "Token de autenticação mal formatado" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Permissões inválidas" });
  }
};

module.exports = getAuth;
