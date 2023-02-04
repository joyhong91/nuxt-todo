const router = require("express").Router();
const authController = require("../controllers/authController");
const isAuth = require("..//middleware/isAuth");

// router.use((req, res, next) => {
//   Object.setPrototypeOf(req, app.request);
//   Object.setPrototypeOf(res, app.response);
//   req.res = res;
//   res.req = req;
//   next();
// });
// router.post("/signin", authController.postSignin);
router.post("/login", authController.postLogin);
// router.get("/user", isAuth, authController.getUser);

module.exports = router;