const todoModel = require("../models/todoModels");
const jwt = require("jsonwebtoken");


exports.addTodo = async (req, res, next) => {
    const { userId, title, deadline, isDone } = req.body;
    try {
        const todo = new todoModel({
            userId,
            title,
            isDone,
            deadline
        });
        const result = await todo.save();
        
        res.status(200).json({
            message: "success add todo",
            todoItem: {userId, title, isDone, deadline}
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTodosByUserId = async (req, res, next) => {

    const { userId } = req.query;

    try {
        const todoList = await todoModel.find({ "userId": userId });

        res.status(200).json({
            message: "success load todo list",
            todoItems: todoList
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

