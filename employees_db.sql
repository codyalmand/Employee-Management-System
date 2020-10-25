-- department:
-- id - INT PRIMARY KEY
-- name - VARCHAR(30) to hold department name

-- role:
-- id - INT PRIMARY KEY
-- title - VARCHAR(30) to hold role title
-- salary - DECIMAL to hold role salary
-- department_id - INT to hold reference to department role belongs to

-- employee:
-- id - INT PRIMARY KEY
-- first_name - VARCHAR(30) to hold employee first name
-- last_name - VARCHAR(30) to hold employee last name
-- role_id - INT to hold reference to role employee has
-- manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT auto_increment PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT auto_increment PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9,2) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT auto_increment PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL
);

INSERT INTO department (name)
VALUES 
('Sales'), 
('Engineering'), 
('Finance'), 
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 1), 
('Salesperson', 80000, 1), 
('Lead Engineer', 150000, 2), 
('Software Engineer', 120000, 2), 
('Accountant', 125000, 3), 
('Legal Team Lead', 250000, 4), 
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('Ashley', 'Ashleyton', 1, null), 
('Paul', 'Pauley', 3, null), 
('Chris', 'Christopher', 4, 2), 
('Sam', 'Samuels', 3, null), 
('Johnny', 'Johnson', 2, 1), 
('Tom', 'Thomas', 2, 1);

SELECT * FROM employee;