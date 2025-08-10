const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};
const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "first and last names are required!" });
  }

  data.setEmployees([...data.employees, newEmployee]);

  res.status(201).json(data.employees);
};
const updateEmployee = (req, res) => {
  const { id, firstname, lastname } = req.body;

  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required!" });
  }

  const updatedEmployees = data.employees.map((emp) =>
    emp.id === parseInt(id) ? { ...emp, firstname, lastname } : emp
  );

  const isFound = updatedEmployees.some((emp) => emp.id === parseInt(id));
  if (!isFound) {
    return res.status(404).json({ message: "Employee not found" });
  }

  data.setEmployees(updatedEmployees);
  return res.status(200).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const { id } = req.body;
  const employeeId = parseInt(id);

  const existingEmployee = data.employees.find((emp) => emp.id === employeeId);
  if (!existingEmployee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const updatedEmployees = data.employees.filter(
    (emp) => emp.id !== employeeId
  );

  data.setEmployees(updatedEmployees);
  res.json({ message: "Employee deleted successfully" });
};

const getEmployee = (req, res) => {
  const { id } = req.params;
  const employeeId = parseInt(id);

  const existingEmployee = data.employees.find((emp) => emp.id === employeeId);
  if (!existingEmployee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json(existingEmployee);
};
module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
