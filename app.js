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
          case "Add Employee Role": addRole();
            break;
          case "Update Employee Role": updateRole();
            break;
            case "Quit": quit();
            break;
        }
    })
  };
function quit() {
  process.end
  startApp;
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
  inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?"
      }
  ]).then(function(res) {
      connection.query("INSERT response INTO department SET ? ",
          {
            name: response.name
          },
          function() {
              if (err) throw err
              console.table(response);
              startApp();
          }
      )})
};

// View roles in database from user input
function viewRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  startApp()
  })
}

// Add role to database from user input
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the role's Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startApp();
            }
        )
    });
  });
}