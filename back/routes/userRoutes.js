const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");
const auth = require("../utils/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/edit/:id", auth, userController.edit);

module.exports = router;
