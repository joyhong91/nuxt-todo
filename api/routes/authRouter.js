const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signin", authController.postSignin);
router.post("/login", authController.postLogin);

module.exports = router;