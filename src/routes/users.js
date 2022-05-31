const router = require("express").Router();
const UserController = require("../controllers/user.controller");

router.get("/", UserController.list);

router.post("/", UserController.register);

module.exports = router;
