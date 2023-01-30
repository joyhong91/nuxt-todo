const todoModel = require("../models/todoModels");

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
    const { userId, isDone} = req.query;
    const date = new Date();
    const dateToString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const today = new Date(dateToString);
    const targetField = isDone ? { userId, isDone, startAt: {$gte: today} } : { userId };
    
    try {
        const todoList = await todoModel.find(targetField).sort({startAt: 1});
        //     $and: [targetField],
        //     $or: [{ startAt: {$lt: compareDate}}, { startAt: {$gte: today}}],
        
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
    let { todoId, isDone } = req.body;
    isDone = !isDone;

    console.log("=====");
    console.log(todoId);

    try {
        const todo = await todoModel.findByIdAndUpdate(todoId, { $set: { isDone } });
        res.status(200).json({
            todoId,
            isDone
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
            deletedTodo: deletedTodo
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
            deletedTodo: deletedTodos
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

