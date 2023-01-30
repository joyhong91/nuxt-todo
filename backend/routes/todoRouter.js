const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/addTodo", todoController.addTodo);
router.get("/getTodosByUserId", todoController.getTodosByUserId);
router.patch("/updateIsDone", todoController.updateIsDone);
router.delete("/deleteTodoById", todoController.deleteTodoById);
router.delete("/deleteMany", todoController.deleteMany);

module.exports = router;
