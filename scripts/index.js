const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs/promises');
const viewAllDepartments = require('../scripts/questionChoices.js')


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

const questionChoice = (answers) => {
   switch(answers) {
    case 'View all departments':
        return 'hello';
   }
};

async function loadQuestions ()  {
    await inquirer.prompt(questions)
    
    .then((answers) => {
    const { answer } = answers;

      questionChoice(answer).then(() => {
        loadQuestions();
    });
     }).catch((error) => {
    console.error('Error during prompt', error);
    process.exit();
     });
  }

function init () {
    loadQuestions();
}

init();