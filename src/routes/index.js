const router = require("express").Router();

router.use("/users", require("./users"));

router.use("/", async (req, res) => {
  try {
    return res.status(200).send({ msg: "Empty" });
  } catch (err) {
    return res.status(500).send({ err, msg: "Error" });
  }
});

module.exports = router;
