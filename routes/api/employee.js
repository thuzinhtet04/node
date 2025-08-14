// const path = require("path");
const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");

const ROLES_LISTS = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LISTS.Admin, ROLES_LISTS.Editor),
    employeeController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LISTS.Admin, ROLES_LISTS.Editor),
    employeeController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LISTS.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
