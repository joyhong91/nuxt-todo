const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    deadline: {
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
