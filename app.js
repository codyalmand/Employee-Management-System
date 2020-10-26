// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

// Dependencies
const path = require('path');
const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "cba123!?",
    database: "employees_db"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    startApp();
  });

//   After connection is made, the app starts and the user is prompted to add a department
 function startApp(){
    inquirer.prompt ([
      {
          name: "menu",
          type: "list",
          message: "To scroll, use up/down arror keys, then use spacebar to select an option",
          choices: [
            "View Departments",
            "Add Department",
            "View Employee Roles",
            "Add Employee Role",
            "Update Employee Role",
          ]
      }])
    .then(response => {
        switch (response.menu) {
          case "View Departments":
            showDepartments();
            break;
          case "Add Departments":
            addDepartments();
            break;
          case "View Employee Roles":
            viewRoles();
            break;
          case "Add Employee Role":
            addRoles();
            break;
          case "Update Employee Role":
            updateRoles();
            break;
        }
    }
)};
