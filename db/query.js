const db = require("../config/connection.js");

module.exports = {
  departmentsQuery() {
    return db.promise().query("SELECT * FROM department");
  },
  rolesQuery() {
    return db
      .promise()
      .query(
        "SELECT role.id,title,salary,department.name FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  },
  employeesQuery() {
    const sql = `
        SELECT e.id,e.first_name,e.last_name,
        CONCAT(m.first_name, " ", m.last_name) AS "manager", r.title 
        FROM employee e
        JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id
        `;
    return db.promise().query(sql); //add manager id
  },
  addDepartmentQuery(data) {
    return db.promise().query("INSERT INTO department SET ? ", data);
  },

  addRoleQuery(data) {
    return db.promise().query("INSERT INTO role SET ? ", data);
  },

  addEmpQuery(data) {
    return db.promise().query("INSERT INTO employee SET ? ", data);
  },
  updateEmpQuery()
  {
    return db
      .promise()
      .query(
        "UPDATE employee SET employee.id = id WHERE employee.id = id",
        "UPDATE employee SET employee.first_name = first WHERE employee.first_name = first"
      );
  },
};
