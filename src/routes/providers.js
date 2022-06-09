const router = require("express").Router();
const auth = require("../middleware/auth");
const ProviderController = require("../controllers/provider.controller");

router.get("/", auth, ProviderController.getAll);
router.get("/:provider_id", auth, ProviderController.getById);

router.put("/update", auth, ProviderController.edit);

router.post("/create", auth, ProviderController.create);

router.delete("/delete", auth, ProviderController.delete);

module.exports = router;
