const router = require("express").Router();
const todoController = require("../controllers/todoController");

router.post("/addTodo", todoController.addTodo);
router.get("/getTodosByUserId", todoController.getTodosByUserId);
router.patch("/updateIsDone", todoController.updateIsDone);
router.patch("/updateTodo", todoController.updateTodo);
router.delete("/deleteTodoById", todoController.deleteTodoById);
router.delete("/deleteMany", todoController.deleteMany);

module.exports = router;
