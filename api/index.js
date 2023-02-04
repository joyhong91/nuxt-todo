const express = require("express");
const cors = require('cors');
const db = require('./db');

// routes
const authRouter = require("./routes/authRouter");
const todoRouter = require("./routes/todoRouter");
const pointRouter = require("./routes/pointRouter");

const app = express();

app.use(cors({
  origin: '*',
}));

app.use('/api/auth/', authRouter);
app.use('/', todoRouter);
app.use('/', pointRouter);


app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  if(!req.session) {
    return next(new Error('session not exist!!!'));
  }else {
    res.status(status).json({ message: message, data: data });
  }
});

export default {
  path: '/',
  handler: app
};



