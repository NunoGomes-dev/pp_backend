const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/clients", require("./clients"));
router.use("/storages", require("./storages"));
router.use("/providers", require("./providers"));
router.use("/parts", require("./parts"));

router.use("/", async (req, res) => {
  try {
    return res.status(200).send({ msg: "URL não atribuido" });
  } catch (err) {
    return res.status(500).send({ err, msg: "Erro" });
  }
});

module.exports = router;
