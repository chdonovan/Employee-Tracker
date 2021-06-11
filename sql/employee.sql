/* database setup *id UNSIGNED AUTO_INCREMENT PRIMARY KEY, */

DROP DATABASE IF EXISTS  employees;
CREATE DATABASE employees;

USE employees;
/* department table */
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL

);
/* ROLE table */
CREATE TABLE role (
    id UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);
/* EMPLOYEE table */
 CREATE TABLE employee (
    id UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) UNIQUE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id, 
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
);   
use employees;

INSERT INTO department
    (name)
VALUES
    ('middleMGMT'),
    ('Analytics'),
    ('Media'),
    ('UpperMGMT');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('GM', 60000), 1),
    ('AM', 45000) 1);
    ('Lead Analyst', 80000, 2),
    ('Analyst', 65000, 2),
    ('Media MGR', 75000, 3),
    ('specialist', 70000, 3),
    ('Ownership', 350000, 4),
    ('DistMGR', 200000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Brock', 'Pewter', 1, NULL),
    ('Misty', 'Cerulean', 2,1),
    ('Surge', 'Vermillion', 3, NULL),
    ('Erika', 'Celadon', 4,3),
    ('Foga', 'Fuchsia' , 5, NULL),
    ('Sabrina', 'Saffron' , 6, 5),
    ('Blaine', 'Cinnabar', 7, NULL),
    ('Giovani', 'Viridian', 8,7);





    

