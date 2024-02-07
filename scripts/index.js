const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Padresrules8?',
    database: 'company_db',
  });

const questions = [
    {
        type: 'list',
        name:'tableChoice',
        message: 'Welcome to Business CMS',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    }
]

const questionChoice = (answers) => {
   switch(answers) {
    case 'View all departments':
        return fs.readFile('db/viewDepartments.sql', (error, data) =>
        error ? console.error(error) : console.log(data)
      );
   }
}
function init() {
  inquirer.prompt(questions);
}

//calling function upon starting the application
init();