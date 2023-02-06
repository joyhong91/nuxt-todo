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
    const { userId, isDone, today} = req.query;
    const targetField = isDone ? { userId, startAt: {$gte: today} } : { userId };
    
    try {
        const todoItems = await todoModel.find(targetField).sort({createdAt: -1});

        res.status(200).json({
            todoItems,
            isDone,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateTodo = async (req, res, next) => {
    let { _id, title, startAt } = req.body;
    try {
        const todoItem = await todoModel.findByIdAndUpdate(_id, { $set: { title, startAt } });
        res.status(200).json({
            todoItem
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateIsDone = async (req, res, next) => {
    let { _id, isDone } = req.body;
    isDone = !isDone;

    try {
        const todoItem = await todoModel.findByIdAndUpdate(_id, { $set: { isDone } });
        res.status(200).json({
            todoItem
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteTodoById = async (req, res, next) => {
    const todoId = req.query.todoId;

    try {
        const todoItem = await todoModel.findByIdAndDelete(todoId);

        res.status(200).json({
            todoItem
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
        const todoItems = await todoModel.deleteMany({ _id: todoIds });

        res.status(200).json({
            todoItems
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

