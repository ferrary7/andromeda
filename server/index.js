const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();
const usersRouter = require('./routes/authentication');
// const routes = require("./routes/heroRoutes");

dotenv.config({
    path: './config.env'
});
require('./db/connection');

app.use(express.json())
app.use(cors());
app.use('/users', usersRouter);
// app.use('/', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
