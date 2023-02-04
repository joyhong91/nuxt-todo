const pointModel = require("../models/pointModels");

exports.createPoint = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const pointItem = new pointModel({ userId });
        const result = await pointItem.save();

        res.status(200).json({
            point: result
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.getPointByUserId = async (req, res, next) => {
    const { userId } = req.query;

    try {
        const point = await pointModel.find({userId});
        
        res.status(200).json({
            point
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


exports.updatePoint = async (req, res, next) => {
    let { todoId, isDone, pointId } = req.body;
    isDone = !isDone;
    try {
        let point;
        if(isDone) {
            point = await pointModel.findByIdAndUpdate(pointId, {$addToSet: {todoIds: todoId}, $inc: {amount: 2}}, {upsert: true});
        } else {
            point = await pointModel.findByIdAndUpdate(pointId, {$pull: {todoIds: todoId}, $inc: {amount: -2}}, {upsert: true});
        }
        
        res.status(200).json({
            message: 'success update point',
            point
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};