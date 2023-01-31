const todoModel = require("../models/todoModels");

exports.addTodo = async (req, res, next) => {
    const { userId, title, startAt, isDone } = req.body;
    try {
        const newTodoModel = new todoModel({
            userId,
            title,
            isDone,
            startAt
        });
        const todoItem = await newTodoModel.save();

        res.status(200).json({
            message: "success add todo",
            todoItem
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTodosByUserId = async (req, res, next) => {
    const { userId, isDone} = req.query;
    const date = new Date();
    const dateToString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const today = new Date(dateToString);
    const targetField = isDone ? { userId, startAt: {$gte: today} } : { userId };
    
    try {
        const todoItems = await todoModel.find(targetField).sort({createdAt: -1});
        res.status(200).json({
            message: "success load todo list",
            todoItems,
            isDone,
            todoLength: todoItems.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.updateIsDone = async (req, res, next) => {
    let { todoId, isDone } = req.body;
    isDone = !isDone;

    try {
        const todo = await todoModel.findByIdAndUpdate(todoId, { $set: { isDone } });
        res.status(200).json({
            message: "success update todo done",
            todo
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteTodoById = async (req, res, next) => {
    const todoId = req.query._id;

    try {
        const deletedTodo = await todoModel.findByIdAndDelete(todoId);

        res.status(200).json({
            message: "success delete todo",
            deletedTodo
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteMany = async (req, res, next) => {
    const todoIds = req.query.ids;

    try {
        const deletedTodos = await todoModel.deleteMany({ _id: todoIds });

        res.status(200).json({
            message: "success delete many todo",
            deletedTodos
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

