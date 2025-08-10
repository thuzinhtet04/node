
const express = require("express");
const router = express.Router();
const refresTokenController =  require("../controllers/refreshTokenController")



router.route("/").get(refresTokenController.handleRefreshToken);

module.exports = router;