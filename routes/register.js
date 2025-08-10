
const express = require("express");
const router = express.Router();
const registerController =  require("../controllers/registerController")


// router.route("/").get(registerController.getAllEmployees).post(registerController.createNewEmployee).put(registerController.updateEmployee).delete(employeeController.deleteEmployee);

router.route("/").post(registerController.handleNewUser);

module.exports = router;