const router = require("express").Router();
const ClientController = require("../controllers/client.controller");
const auth = require("../middleware/auth");

router.get("/", auth, ClientController.getAll);
router.get("/:client_id", auth, ClientController.getById);

router.put("/update", auth, ClientController.edit);

router.post("/create", auth, ClientController.create);

router.delete("/delete", auth, ClientController.delete);

module.exports = router;
