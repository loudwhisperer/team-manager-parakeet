const db = require("../config/connection.js");
// queries that link to functions in in server js to return db info, add db info and update db info
module.exports = {
    //returns all departments from db
  departmentsQuery() {
    return db.promise().query("SELECT * FROM department");
  },
  //returns all roles from db
  rolesQuery() {
    return db
      .promise()
      .query(
        "SELECT role.id,title,salary,department.name FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  },
  //returns all employees from db
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
  //adds departments to db
  addDepartmentQuery(data) {
    return db.promise().query("INSERT INTO department SET ? ", data);
  },
//adds roles to db
  addRoleQuery(data) {
    return db.promise().query("INSERT INTO role SET ? ", data);
  },
//adds employees to db
  addEmpQuery(data) {
    return db.promise().query("INSERT INTO employee SET ? ", data);
  },
  //updates the role of an employee
  updateRoleQuery(employeeId, roleId)
  {
    return db
      .promise()
      .query(
        "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
  },
  //updates the manager of a db
  updateManagerQuery(employeeId, managerId){
    return db.promise().query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId])
  }
};
