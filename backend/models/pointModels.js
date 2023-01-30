const mongoose = require("mongoose");
const { integer } = require("vuelidate/lib/validators");
const Schema = mongoose.Schema;

const PointSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    todoIds: {
      type: Array,
      default: []
    },
    amount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Point", PointSchema);
