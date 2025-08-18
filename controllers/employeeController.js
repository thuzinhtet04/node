const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const result = await Employee.find();
  console.log(result, "result");
  if (!result)
    res.status(204).json({ message: "There is no Employee at the moment" });
  res.json(result);
};
const createNewEmployee = async (req, res) => {
  const newEmployee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "first and last names are required!" });
  }
  try {
    const result = await Employee.create(newEmployee);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};
const updateEmployee = async (req, res) => {
  const { id, firstname, lastname } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is required!" });
  }

  const employee = await Employee.findOne({ _id: id }).exec();

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  if (firstname) employee.firstname = firstname;
  if (lastname) employee.lastname = firstname;
  const result = await employee.save();

  return res.status(200).json(result);
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;

  if (!id) res.status(400).json({ message: "Id parameter is required!" });

  const employeeId = parseInt(id);

  const employee = await Employee.findOne({ _id: employeeId }).exec();
  if (!employee) res.sendStatus(404);

  const result = await employee.deleteOne({ _id: employeeId });
  res.json(result);
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ message: "Id param is required!" });
  const employeeId = parseInt(id);

  const employee = await Employee.findOne({ _id: employeeId }).exec();
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json(employee);
};
module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
