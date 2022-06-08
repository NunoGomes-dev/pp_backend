require("dotenv/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserService = require("../services/user.service");

const timeToExpire = 86400;

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET_KEY, { expiresIn: timeToExpire });
}

module.exports = {
  async list(req, res) {
    try {
      const users = await UserService.getAll();
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send({ err });
    }
  },
  async register(req, res) {
    const { firstname, lastname, email, password, vat, phone } = req.body;
    if (!firstname) return res.status(500).send("Primeiro nome inválido");
    if (!lastname) return res.status(500).send("Último nome inválido");
    if (!email) return res.status(500).send("Email inválido");
    if (!password) return res.status(500).send("Palavra-passe inválida");

    try {
      const hashedPw = await bcrypt.hash(password, 10);

      const user = await UserService.createOne({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hashedPw,
        vat,
        phone,
      });

      if (!user) return res.status(500).send("Erro ao criar utilizador");
      return res.status(200).send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ err });
    }
  },
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) return res.status(500).send("Email inválido");
      if (!password) return res.status(500).send("Palavra-passe inválida");

      const user = await UserService.getByEmailWithPassword({ email });
      console.log("hey", user);

      const next = bcrypt.compare(password, user.password);

      if (!next) {
        return res.status(401).send({ err: "Credenciais inválidas" });
      }

      delete user["password"];

      return res.status(200).send({
        expiresIn: timeToExpire,
        accessToken: generateToken({ ...user }),
        user: { ...user },
      });
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error });
    }
  },
};
