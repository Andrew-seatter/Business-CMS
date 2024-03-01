const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs/promises');
const path = require('path');

//connection to sql db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Padresrules8?',
    database: 'company_db',
  });


  //main set of questions that will be called back a few times in the CMS
const questions =  [
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
        ],
    },
]

//async function to coincide with the fs/promises package being used
async function viewAllDepartments() {
 const results = await fs.readFile(path.join(__dirname, 'db', 'viewDepartments.sql'), 'utf8');
  
    return connection.promise().query(results);
};

async function viewAllRoles () {
    const results = await fs.readFile(path.join(__dirname, 'db', 'viewRoles.sql'), 'utf8');

    return connection.promise().query(results);
}

async function viewAllEmployees() {
    const results = await fs.readFile(path.join(__dirname, 'db', 'viewEmployees.sql'), 'utf8');

    return connection.promise().query(results);
}

//inserting a department in to the db the function itself doesnt need to be async just what we do with the promise results needs to be awaited
function addDepartment () {
        return inquirer.prompt([
          {
            type: "input",
            name: "departmentName",
            message: "What would you like to name the department",
          }
        ])
        .then(async answers => { 
          await connection.promise().query(`INSERT INTO departments (department_title) VALUES ("${answers.departmentName}")`);
          return viewAllDepartments();
          })
      }

      async function addRole () {
      const [departments] = await connection.promise().query('SELECT * FROM departments');

      return inquirer.prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "roleDepartment",
          choices: departments.map(({id, department_title}) => ({value: id, department_title})),
        }
      ])
      .then(async answers => { 
        await connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.roleName}", "${answers.roleSalary}", ${answers.roleDepartment})`);
        return viewAllRoles();
        })
    }

    async function addEmployee() {
        const [employees] = await connection.promise().query('SELECT * FROM employee');
        const [roles] = await connection.promise().query('SELECT * FROM role');

        return inquirer.prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "employeeRole",
            choices: roles.map(({id, title}) => ({value: id, name: title})),
            message: "What is the employee's title?",
          },
          {
            type: "list",
            name: "employeeManager",
            choices: employees.map(({id, first_name, last_name}) => ({value: id, name: `${first_name} ${last_name}`})),
            message: "Who will be this employee's manager?",
          }
        ])
        .then(async answers => { 
          await connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.employeeRole}, ${answers.employeeManager})`);
          return viewAllEmployees();
        });
      }

      async function updateEmployeeRole() {
        const [employees] = await connection.promise().query('SELECT * FROM employee');
        const [roles] = await connection.promise().query('SELECT * FROM role');

        return inquirer.prompt([
          {
            type: "list",
            name: "employeeToUpdateRole",
            choices: employees.map(({id, first_name, last_name}) => ({value: id, name: `${first_name} ${last_name}`})),
            message: "Which employee's role do you want to update?",
          },
          {
            type: "list",
            name: "employeeNewRole",
            choices: roles.map(({id, title}) => ({value: id, name: title})),
            message: "Which role do you want to assign the selected employee?",
          }
        ]).then(async answers => {
          await connection.promise().query(`UPDATE employee SET role_id = ${answers.employeeNewRole} WHERE id = ${answers.employeeToUpdateRole}`); // update query instruction
          return viewAllEmployees();
        })
      };


      //this switch had to be async to work with the above functions kept getting unfufilled promises when it was regular
const questionChoice = async (answers) => {
   switch(answers) {
    case 'View all departments':
        const viewDepartments  = await viewAllDepartments();
        return viewDepartments;

        case 'View all employees':
        const viewEmployees  = await viewAllEmployees();
        return viewEmployees;

        case 'View all roles':
        const viewRoles  = await viewAllRoles();
        return viewRoles;

        case 'Add a department':
        const department = await addDepartment();
        return department;

        case 'Add a role':
        const role = await addRole();
        return role;

        case 'Add an employee':
        const employee = await addEmployee();
        return employee;

        case 'Update an employee role':
        const updatedEmployee  = await updateEmployeeRole();
        return updatedEmployee;
   }
};

function init() {
    inquirer.prompt(questions)
    .then((answers) => {
     questionChoice(answers.tableChoice)
     .then((query) => {
        console.log(query);
        return init();
     })
    })
    
    
     .catch((error) => {
    console.error('Error during prompt', error);
    process.exit();
     });

}

init();