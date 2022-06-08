const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.get("/", auth, UserController.list);
router.post("/register", UserController.register);
router.post("/sign-in", UserController.signIn);

module.exports = router;
