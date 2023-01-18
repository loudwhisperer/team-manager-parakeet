const inquirer = require("inquirer");
const ctable = require("console.table");
const {departmentsQuery, rolesQuery, employeesQuery, addEmpQuery} = require("./db/query.js")


const starter = [
  {
    type: "list",
    message: "Choose One",
    name: "starterList",
    choices: [
      { name: "View all Departments", value: "ViewallDepartments" },
      { name: "View all Roles", value: "ViewallRoles" },
      { name: "View all Employees", value: "ViewallEmployees" },
      { name: "Add a Department", value: "AddaDepartment" },
      { name: "Add a Role", value: "AddaRole" },
      { name: "Add a Employee", value: "AddaEmployee" },
      { name: "Update an Employee Role", value: "UpdateanEmployeeRole" },
    ],
  },
];

const menu = async () => {
    const {starterList} = await inquirer.prompt(starter)
    switch (starterList) {
        case 'ViewallDepartments':
            //run view all department function  
            viewAllDepartments();
            break;
        case 'ViewallRoles':
            //run view all roles function  
            viewAllRoles()
            break;
        case 'AddaEmployee':
            addEmployee()
            break;
        default:
            break;
    }
}

const viewAllDepartments = async () => {
     const departmentResults = await departmentsQuery();
     console.table(departmentResults[0]);
     menu();
}

const viewAllRoles = async () => {
  const [results] = await rolesQuery();
  console.table(results);
  menu();
};

const addEmployee = async () => {
    const [rolesDb] = await rolesQuery();
    const [employeesDb] = await employeesQuery();
    const roles = rolesDb.map(role => ({name:role.title, value:role.id}))
    const employees = employeesDb.map(employee => ({name:employee.last_name, value:employee.id}))
    const employeeData = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the Employees First Name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Employees Last Name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What Role does this employee have?",
        choices: roles,
      },
      //TODO: ASK ABOUT ADDING MANGER ID
    ]);
    const db = await addEmpQuery(employeeData)
    console.log('You added a new employee!')
    menu()
}

menu()