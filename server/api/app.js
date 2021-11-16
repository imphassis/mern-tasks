const express = require('express');
const { error } = require('./middlewares');
const { taskRouter, userRouter } = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', userRouter);
app.use('/api', taskRouter);

app.use(error);

module.exports = app;
