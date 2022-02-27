const express = require("express");

const router = express.Router();

const spotController = require("../controllers/spot");
const auth = require("../utils/auth");

router.post("/add", auth, spotController.add);
router.post("/picture", auth, spotController.picture);
router.get("/all", spotController.all);

module.exports = router;
