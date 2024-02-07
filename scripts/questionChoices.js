const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs/promises');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Padresrules8?',
    database: 'company_db',
  });

async function viewAllDepartments() {
    return fs.readFile(path.join(__dirname, 'db', 'viewDepartments.sql'), 'utf8')
    .then((sql) => {
      return connection.promise().query(sql); 
    });
};

viewAllDepartments();
module.exports = (viewAllDepartments, connection);


//json string callback function attempt
//inquirer prompts for adding or updating employee
//connecting all together