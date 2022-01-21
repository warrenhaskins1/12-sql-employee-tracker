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



//inquirer prompts start

function promptStart() {
  inquirer
    .prompt({
      type: "list",
      name: "initQuestions",
      message:
        "Please choose an action from the options provided below (Use the arrow keys).",
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
    promptStart();
  });
}

//Should return title, role id, department that the role belongs to and the salary for that role.
function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    promptStart();
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
    promptStart();
  });
}

//Should allow user to add a Department to the employees_db. Will need a prompt an INSERT INTO.
function addDepartment() {

}

//Should allow user to add a Role to the employees_db. Will need a prompt and INSERT INTO.
function addRole() {

}

//Should allow user to add an Employee to the employees_db. Will need a prompt and INSERT INTO.
function addEmployee() {

}

//Should allow user to update an employee's Role. Will need prompt and UPDATE query.
function updateEmployeeRole() {

}

//Should allow user to exit the app.
function exitApp() {
    
}