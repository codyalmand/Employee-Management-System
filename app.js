// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

const path = require("path");
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
            name: "addDepartment",
            type: "input",
            message: "What department would you like to add?"
        },
      ])
  }