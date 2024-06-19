var express = require("express");
var router = express.Router();
const userController = require("../controllers/UserController.js");
const requireAuth = require("../auth/requireAuth.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all", requireAuth, userController.getAll);
router.patch("/edit/:id", requireAuth, userController.update);
router.get("/get/:id", requireAuth, userController.getById);
router.patch("/editPassword/:id", requireAuth, userController.editPassword);

module.exports = router;
