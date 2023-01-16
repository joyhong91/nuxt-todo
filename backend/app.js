// const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({path: 'variables.env'});

// routes
const authRouter = require("./routes/authRouter");
const todoRouter = require("./routes/todoRouter");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth/", authRouter);
app.use("/", todoRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// connect to db
// const MONGOOSE_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@joyhong.cwungwg.mongodb.net/test`;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    console.log('Connected to database successfully');
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));
