const inquirer = require("inquirer");
const ctable = require("console.table");
const {departmentsQuery, rolesQuery, employeesQuery, addDepartmentQuery, addRoleQuery, addEmpQuery, updateEmpQuery} = require("./db/query.js")


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
      case "ViewallDepartments":
        //run view all department function
        viewAllDepartments();
        break;
      case "ViewallRoles":
        //run view all roles function
        viewAllRoles();
        break;
      case "ViewallEmployees":
        //run view all employees function
        viewallEmployees();
        break;
      case "AddaDepartment":
        addDepartment();
        break;
      case "AddaRole":
        addRole();
        break;
      case "AddaEmployee":
        addEmployee();
        break;
      case "UpdateanEmployeeRole":
        updateEmployee();
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

const viewallEmployees = async () => {
    const [results] = await employeesQuery();
    console.table(results);
    menu();
}

const addDepartment = async () => {
    const [departmentDb] = await departmentsQuery();
    const departments = departmentDb.map(department => ({name:department.name, value:department.id}))
    const departmentData = await inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'What is the new department you would like to add?',
        }
    ])
    const db = await addDepartmentQuery(departmentData);
    console.log("You added a new department!");
    menu();
}

const addRole = async () => {
    const [departmentDb] = await departmentsQuery();
    const [rolesDb] = await rolesQuery();
    const departments = departmentDb.map(department => ({name:department.name, value:department.id}))
    //const roles = rolesDb.map(role => ({name:role.title, value:role.id}))
    const roleData = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of this Role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this Role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "What is the department does the person with this role work in?",
        choices: departments,
      },
    ]);
      const db = await addRoleQuery(roleData);
      console.log("You added a new role!");
      menu();
}

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
    const updateEmployee = async () => {
      const [rolesDb] = await rolesQuery();
      const [employeesDb] = await employeesQuery();
      const roles = rolesDb.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      const employees = employeesDb.map((employee) => ({
        name: employee.last_name,
        value: employee.id, name:employee.first_name, value:employee.id
      }));
      const empChoice = await inquirer.prompt([
        {
          type: "list",
          name: "employee.id",
          message: "Which employee would you like to update?",
          choices: employees,
        }
      ])
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
        {
          type: "list",
          name: "manager_id",
          message: "Who is this employee's manager?",
          choices: employees,
        },
      ]);
      const da = await updateEmpQuery(empChoice);
      const db = await updateEmpQuery(employeeData);
      console.log("You updated an employee!");
      menu();
    };
menu()