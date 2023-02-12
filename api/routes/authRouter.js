const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signUp", authController.postSignUp);
router.post("/login", authController.postLogin);

module.exports = router;