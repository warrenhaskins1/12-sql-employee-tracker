//DEPENDENCIES
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");

const employeeChoices = [];
const departmentChoices = [];
const roleChoices = [];

//Create connection to the db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
});

//Screen Title ASCII
console.log(
  "================================WELCOME TO THE====================================="
);
figlet("Employee Tracker", function (err, data) {
  if (err) {
    console.log("Uh oh, somethings not quite right...");
  }
  console.log(data);
  console.log(
    "===================================================================================="
  );
  console.log();
});

//Connects server to db
db.connect((err) => {
  if (err) throw err;
  promptStart();
});

//Questions/prompts
function promptStart() {
  inquirer
    .prompt({
      type: "list",
      name: "initQuestions",
      message:
        "Please choose an action from the options provided below.",
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
      console.log(answers.initQuestions);
      //switch statement add functions for each choice
      switch (answers.initQuestions) {
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

//Exit app
function exitApp() {
  console.log("Goodbye!");
  db.end;
}

//Should return table with department name and id
function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, result) {
    if (err) throw err;
    console.table(result);
    promptStart();
  });
}

//Should return title, role id, department that the role belongs to and the salary for that role.
function viewRoles() {
  db.query(
    "SELECT roles.id, roles.title, roles.salary, roles.department_id, departments.id, departments.dname FROM roles LEFT JOIN departments on roles.department_id = departments.id",
    function (err, result) {
      if (err) throw err;
      console.table(result);
      promptStart();
    }
  );
}

//Should return table with employee id, fname/lname, title, dept, salary and manager
function viewEmployees() {
  db.query(
    "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, employees.manager_id, roles.title, roles.salary, roles.id, departments.id FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id",
    function (err, result) {
      if (err) throw err;
      console.table(result);
      promptStart();
    }
  );
}

//Functions to get data about Employees/Roles/Departments and push to array to use for updates/insert
/////////////////////////////////////////////////////////////////////////////////////////////////////
function getRole() {
  db.query("SELECT * FROM roles", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      roleChoices.push(data[i].id + "-" + data[i].title);
    }
  });
}

function getEmployee() {
  db.query("SELECT * FROM employees", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      employeeChoices.push(
        data[i].id + "-" + data[i].first_name + " " + data[i].last_name
      );
    }
  });
}

function getDepartment() {
  db.query("SELECT * FROM departments", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      departmentChoices.push(data[i].id + "-" + data[i].dname);
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

//Function to add a Department to db
function addDepartment() {
  getRole();
  getEmployee();
  getDepartment();

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
      const query = `INSERT INTO departments (dname)
       VALUES ('${answer.addDept}')`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log(`${answer.addDept} added to Departments!`);
      });
      promptStart();
    });
}

//Function to add a Role to db
function addRole() {
  getRole();
  getEmployee();
  getDepartment();

  inquirer
    .prompt([
      {
        type: "input",
        name: "addRoleName",
        message: "What role would you like to add to the database?",
      },
      {
        type: "list",
        name: "addRoleDept",
        message: "Which department does the role belong to?",
        choices: departmentChoices,
      },
      {
        type: "number",
        name: "addRoleSalary",
        message: "What is the salary of the role?",
      },
    ])
    .then(function (answer) {
      console.log(`${answer.addRoleName}`);
      const getDeptId = answer.addRoleDept.split("-");
      const query = `INSERT INTO roles (title, salary, department_id)
     VALUES ('${answer.addRoleName}','${answer.addRoleSalary}','${getDeptId[0]}')`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log(`${answer.addRoleName} added to Roles!`);
      });
      promptStart();
    });
}

//Function to add an Employee to the db
function addEmployee() {
  getRole();
  getEmployee();

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
        type: "list",
        name: "addERole",
        message: "What is the role of the new Employee?",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "newEmpMan",
        message: "Who is the new Employee's Manager?",
        choices: employeeChoices,
      },
    ])
    .then(function (answer) {
      const getRoleId = answer.addERole.split("-");
      const getnewEmpManId = answer.newEmpMan.split("-");
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
       VALUES ('${answer.addFName}','${answer.addLName}','${getRoleId[0]}','${getnewEmpManId[0]}')`;
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log(
          `${answer.firstname} ${answer.lastname} has been added as a new Employee!`
        );
      });
      promptStart();
    });
}

//Function to update Employees role
function updateEmployeeRole() {
  db.query("SELECT * FROM employees", function (err, result) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectEmployee",
          message: "Which Employee would you like to Update?",

          choices: function () {
            const employeesArray = [];
            result.forEach((result) => {
              employeesArray.push(result.last_name);
            });
            return employeesArray;
          },
        },
      ])
      .then(function (answer) {
        console.log(answer);
        const name = answer.selectEmployee;

        db.query("SELECT * FROM roles", function (err, res) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "newUpdatedEmployeeRole",
                message:
                  "What is the new role that you would like to assign to the Employee?",

                choices: function () {
                  const updatedRoleArray = [];
                  res.forEach((res) => {
                    updatedRoleArray.push(res.title);
                  });
                  return updatedRoleArray;
                },
              },
            ])
            .then(function (roleAnswer) {
              const role = roleAnswer.newUpdatedEmployeeRole;
              console.log(role);
              db.query(
                "SELECT * FROM roles WHERE title = ?",
                [role],
                function (err, res) {
                  if (err) throw err;
                  const roleId = res[0].id;
                  const query =
                    "UPDATE employees SET role_id = ? WHERE last_name =  ?";
                  const values = [parseInt(roleId), name];

                  db.query(query, values, function (err, res) {
                    console.log(`You have updated ${name}'s role to ${role}.`);
                  });
                  viewEmployees();
                }
              );
            });
        });
      });
  });
}
