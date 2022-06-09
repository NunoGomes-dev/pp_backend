const router = require("express").Router();
const auth = require("../middleware/auth");
const StorageController = require("../controllers/storage.controller");

router.get("/", auth, StorageController.getAll);
router.get("/:storage_id", auth, StorageController.getById);

router.put("/update", auth, StorageController.edit);

router.post("/create", auth, StorageController.create);

router.delete("/delete", auth, StorageController.delete);

module.exports = router;
