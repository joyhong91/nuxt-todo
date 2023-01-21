const todoModel = require("../models/todoModels");
const jwt = require("jsonwebtoken");


exports.addTodo = async (req, res, next) => {
    const { userId, title, startAt, isDone } = req.body;
    try {
        const todoItem = new todoModel({
            userId,
            title,
            isDone,
            startAt
        });
        const result = await todoItem.save();
        
        res.status(200).json({
            message: "success add todo",
            todoItem: result
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
        const todoList = await todoModel.find({ "userId": userId }).sort({createdAt: -1});

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
};

exports.updateIsDone = async (req, res, next) => {
    let {todoId, isDone} = req.body;
    isDone = !isDone;

    try {
        const todo = await todoModel.findByIdAndUpdate(todoId, {$set: {isDone}});

        res.status(200).json({
            message: "success update todo isDone",
            result: {
                todoId,
                isDone
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteTodoById = async (req, res, next) => {
    const todoId  = req.query._id;

    try {
        const deletedTodo = await todoModel.findByIdAndDelete(todoId);
        
        res.status(200).json({
            message: "success delete todo",
            deletedTodo: deletedTodo
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

