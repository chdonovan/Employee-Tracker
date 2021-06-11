// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const { createPool } = require('mysql2/promise');
require('console.table');

const promptMessages = {
    viewAllEmployees: "View All Employees",
    viewByDepartment: "View All Employees By Department",
    viewByManager: "View All Employees By Manager",
    addEmployee: "Add An Employee",
    removeEmployee: "Remove An Employee",
    updateRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    viewAllRoles: "View All Roles",
    exit: "Exit"
};

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'OPENTHEGATE',
    database: 'employees'
});

connection.connect(err => {
    if (err) throw err;
    prompt();

});

function prompt( ) {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'what would you like to do?',
        choices: [
            promptMessages.viewAllEmployees,
            promptMessages.viewByDepartment,
            promptMessages.viewByManager,
            promptMessages.viewAllRoles,
            promptMessages.addEmployee, 
            promptMessages.removeEmployee,
            promptMessages.updateRole,
            promptMessages.exit
        ]
    })
    .then( answer => {
        console.log('answer', answer);
        switch (answer.action) {
            case promptMessages.viewAllEmployees:
                viewAllEmployees();
                break;
            
            case promptMessages.viewByDepartment:
                viewByDepartment();
                break;
            
            case promptMessages.viewByManager:
                viewByManager();
                break;
            
            case promptMessages.addEmployee:
                addEmployee();
                break;
            
            case promptMessages.removeEmployee:
                remove('delete');
                break;

            case promptMessages.updateRole:
                remove('role');
                break;
            
            case promptMessages.viewAllRoles:
                viewAllRoles();
                break;
            
            case promptMessages.exit:
                connection.end();
                break;
        }

    });

}

function viewAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role.id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res)=> {
        if (err) throw err;
        console.log (err);
        console.log('VIEW ALL EMPLOYEES');
        console.log('/n');
        console.log(res);
        prompt();
    });
}

function viewByDepartment() {
    const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM epmloyee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON(department.id = role.department_id)
    ORDER BY department.name;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('/n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('/n');
        console.table(res);
        prompt();
    });
}

function viewByManager() {
    const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
    connection.query(query, (err, res) =>{
        if (err) throw err;
        console.log('/n');
        console.log('view employee by manager');
        console.log('/n');
        console.table(res);
        prompt();
    });
}
function viewAllRoles(){
    const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
    connection.query(query, (err, res) =>{
        if (err) throw err;
        console.log('/n');
        console.log('view employee by role');
        console.log('/n');
        console.table(res);
        prompt();
    });

}
