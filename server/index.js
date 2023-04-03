const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const usersRouter = require("./router/authentication");
const launchesRouter = require("./router/launchData");
const displayRouter = require("./router/displayLaunch");
const likesRouter = require("./router/likeData");

dotenv.config({
  path: "./config.env",
});
require("./db/connection");

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/api", launchesRouter);
app.use("/data", displayRouter);
app.use("/id", likesRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
