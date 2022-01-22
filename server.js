//List TODO
//setup enviroment We need db folder/schema/seeds/inquirer statements/db.connect

//DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql2");
const fs = require("fs");
const consoleTable = require("console.table");
const figlet = require("figlet");

const seedQuery = fs.readFileSync("./db/seeds.sql");

//Create connection to the db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log(
    "================================WELCOME TO THE====================================="
  )
  //node index.js --> works/connection established
);

//Connects server to the db
db.connect(function (err) {
  if (err) throw err;
  //displays a welcome for the user
  figlet("Employee Tracker", function (err, data) {
    if (err) {
      console.log("Uh oh, somethings not quite right...");
      console.dir(err);
      return;
    }
    console.log(data);
    console.log(
      "===================================================================================="
    );
    console.log();
  });
});

db.query(seedQuery, (err) => {
  if (err) {
    throw err;
  }
});
promptStart();

//inquirer prompts start

function promptStart() {
  inquirer
    .prompt({
      type: "list",
      name: "initQuestions",
      message:
        "Please choose an action from the options provided below (Use the arrow keys).",
      choices: [
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
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message:
          "What is the name of the Department that you would like to add?",
      },
    ])
    .then(function (answer) {
      console.log(answer);
      //Add query here
      promptStart();
    });
}

//Should allow user to add a Role to the employees_db. Will need a prompt and INSERT INTO.
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRoleName",
        message: "What role would you like to add to the database?",
      },
      {
        type: "input",
        name: "addRoleSalary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "addRoleDept",
        message: "Which department does the role belong to?",
      },
    ])
    .then(function (answer) {
      //Add query here
      promptStart();
      console.log(answer);
    });
}

//Should allow user to add an Employee to the employees_db. Will need a prompt and INSERT INTO.
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addFName",
        message:
          "What is the first name of the employee that you would like to add to the database?",
      },
      {
        type: "input",
        name: "addLName",
        message:
          "What is the last name of the employee that you would like to add to the database?",
      },
      {
        type: "input",
        name: "addERole",
        message: "What is the role of the new Employee?",
      },
      {
        type: "input",
        name: "addManagerFName",
        message: "What is the first name of the new Employee's Manager?",
      },
      {
        type: "input",
        name: "addManagerLName",
        message: "What is the last name of the new Employee's Manager?",
      },
    ])
    .then(function (answer) {
      //Add query here
      promptStart();
      console.log(answer);
    });
}

//Should allow user to update an employee's Role. Will need prompt and UPDATE query.
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selectEmployee",
        message: "Which Employee would you like to Update?",
        //need to access the employees from the db to generate list
        choices: [],
      },
      {
        type: "input",
        name: "newUpdatedEmployeeRole",
        message:
          "What is the new role that you would like to assign to the Employee?",
      },
    ])
    .then(function (answer) {
      console.log(answer);
      //Add query here
      promptStart();
    });
}

//Should allow user to exit the app.
function exitApp() {}
