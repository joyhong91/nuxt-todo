const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/addTodo", todoController.addTodo);
router.get("/getTodosByUserId", todoController.getTodosByUserId);
// router.post("/login", authController.postLogin);
// router.get("/user", isAuth, authController.getUser);

module.exports = router;
