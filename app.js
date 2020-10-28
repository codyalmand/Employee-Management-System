
// Dependencies
const path = require('path');
const mysql = require('mysql');
const inquirer = require('inquirer');

// Create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "cba123!?",
    database: "employees_db"
  });

// Connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
    startApp();
  });

// After connection is made, the app starts and the user is prompted to make a selection from options menu
 function startApp(){
    inquirer.prompt ([
      {
          name: "menu",
          type: "list",
          message: "Use up/down Arror Keys to scroll, select an option by using Enter",
          choices: [
            "View Departments",
            "Add Department",
            "View All Employees",
            "Add Employee",
            "View Employee Roles",
            "Add Employee Role",
            "Update Employee Role",
            "Quit"
          ]
      }
    ])
    .then(response => {
        switch (response.menu) {
          case "View Departments": viewDepartments();
            break;
          case "Add Departments": addDepartment();
            break;
          case "View All Employees": viewAllEmployees();
            break;
          case "Add Employee": addEmployee();
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
  process.exit();
  };

// Builds a table which shows existing departments
function viewDepartments() {
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
      connection.query("INSERT res INTO department VALUES ? ",
          {
            name: res.name
          },
          function() {
              if (err) throw err
              console.table(res);
              startApp();
          }
      )});
};

// Views all employees in the database from previous user input
function viewAllEmployees() {
  connection.query("SELECT * FROM employee",
  function(err, res) {
    if (err) throw err
    console.table(res);
    startApp();
})
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "employeeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "employeeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      }
    ])
    .then(function(res) {
      connection.query("INSERT res INTO employee VALUES ?", 
      function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
      });
    });
}

// View employee roles in database from user input
function viewRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res);
    startApp();
  })
}


// Add employee role to database from user input
function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",
   function(err, res) {
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

// Select role quieries, role title for add employee prompt
const roleArray = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  })
  return roleArray;
}

// Updates the employee information in database
function updateRole() {
  connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
   function(err, res) {
   if (err) throw err
   console.log(res)
  inquirer.prompt([
        {
          name: "lastName",
          type: "rawlist",
          choices: function() {
            const lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
          message: "What is the Employee's last name? ",
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the Employees new title? ",
          choices: selectRole()
        },
    ]).then(function(val) {
      const roleId = selectRole().indexOf(val.role) + 1
      connection.query("UPDATE employee SET WHERE ?", 
      {
        last_name: val.lastName
      }, 
      {
        role_id: roleId
      }, 
      function(){
          if (err) throw err
          console.table(val);
          startApp();
      })
  });
});
}