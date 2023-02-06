const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: false,
    },
    isDone: {
        type: Boolean,
        required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
