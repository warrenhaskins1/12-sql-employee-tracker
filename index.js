//List TODO
//setup enviroment We need db folder/schema/seeds/inquirer statements/db.connect

//DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

//Connect to the db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log("You are now connected to the employees_db!")
  //node index.js --> works/connection established
);

//Query that returns all data from db
// db.query("SELECT * FROM employees_db", function (err, results) {
//     console.log(results);
// });

//inquirer prompts start

function startApp() {
  inquirer
    .prompt({
      type: "list",
      name: "initQuestions",
      message:
        "Welcome! Please choose an action from the options provided below (Use the arrow keys).",
      choice: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit the App",
      ],
    })
    .then((answers) => {
      console.log(answers.choice);
      //switch statement add functions for each choice
      switch (answers.choice) {
        case "View all Departments":
          viewDepartments();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "View all Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
        case "Exit the App":
          exitApp();
          break;
      }
    });
}

//Stub-out functions for views Departments/Roles/Employees. db.query

//Should return table with department name and id
function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
  });
}

//Should return title, role id, department that the role belongs to and the salary for that role.
function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
  });
}

//Should return table with employee id, fname/lname, title, dept, salary and manager
function viewEmployees() {
    const query = 
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dname AS department, employees.manager_id" +
    "FROM employees" +
    "JOIN roles ON roles.id = employees.role_id" +
    "JOIN departments ON roles.department_id = departments.id" +
    "ORDER BY employees.id;";

    db.query(query, function (err, result) {
        console.table(result);
    });
    // db.query("SELECT * FROM employees", function (err, results) {
    //     console.table(results);
    // });
}
