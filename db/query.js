const db = require('../config/connection.js');

module.exports = {
    departmentsQuery(){
        return db.promise().query('SELECT * FROM department')
    },
    rolesQuery(){
        return db.promise().query('SELECT role.id,title,salary,department.name FROM role LEFT JOIN department ON role.department_id = department.id')
    },
    addEmpQuery(data){
        return db.promise().query('INSERT INTO employee SET ? ',data)
    },
    employeesQuery(){
        return db.promise().query('SELECT employee.id,first_name,last_name,role.name FROM employee LEFT JOIN role ON employee.role_id = role.id,manager_id FROM employee')
    }
}