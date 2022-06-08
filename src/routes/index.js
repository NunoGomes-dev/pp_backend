const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/clients", require("./clients"));

router.use("/", async (req, res) => {
  try {
    return res.status(200).send({ msg: "URL não atribuido" });
  } catch (err) {
    return res.status(500).send({ err, msg: "Erro" });
  }
});

module.exports = router;
