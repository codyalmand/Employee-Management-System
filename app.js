// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

// Dependencies
const path = require('path');
const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection information for the sql database
const connection = mysql.createConnection({
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

// After connection is made, the app starts and the user is prompted to make a selection from options
 function startApp(){
    inquirer.prompt ([
      {
          name: "menu",
          type: "list",
          message: "Use up/down Arror Keys to scroll, select an option by using Enter",
          choices: [
            "View Departments",
            "Add Department",
            "View Employee Roles",
            "Add Employee Role",
            "Update Employee Role",
            "Quit"
          ]
      }
    ])
    .then(response => {
        switch (response.menu) {
          case "View Departments": showDepartments();
            break;
          case "Add Departments": addDepartment();
            break;
          case "View Employee Roles": viewRoles();
            break;
          case "Add Employee Role": addRoles();
            break;
          case "Update Employee Role": updateRoles();
            break;
            case "Quit": quit();
            break;
        }
    })
  };
function quit() {
  process.end
  }; 

// Builds a table which shows existing departments
function showDepartments() {
  query = `SELECT name AS "Department" FROM department`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  })
};


// Add a new department to the database
function addDepartment() {
  query = `SELECT name AS "Department" FROM department`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("List of current Departments", res);
  inquirer.prompt([
      {
          name: "departmentName",
          type: "input",
          message: "Enter new Department name:",

      }
    ])
  .then(response => {
    connection.query ('INSERT INTO department (name) VALUES (?)', response.departmentName)
    startApp();
  })
  })
};
