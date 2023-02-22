const express = require("express");
const router = express.Router();

// const authenticationRouter = require("./authentication");
const launchDataRouter = require("./launchData");

// router.use(authenticationRouter);
router.use(launchDataRouter);

module.exports = router;
