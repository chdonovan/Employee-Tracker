/* database setup */
DROP DATABASE IF EXISTS  employees;
CREATE DATABASE employees;

USE employees;
/* department table */
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL

);

