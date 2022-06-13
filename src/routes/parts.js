const router = require("express").Router();
const PartController = require("../controllers/part.controller");
const auth = require("../middleware/auth");

router.get("/", auth, PartController.getAll);
router.get("/:part_id", auth, PartController.getById);

router.post("/create", auth, PartController.create);

router.put("/update", auth, PartController.update);

router.delete("/delete", auth, PartController.delete);

module.exports = router;
