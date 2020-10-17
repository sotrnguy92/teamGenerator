const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const questions = [
    {
        type: 'input',
        name: 'managerName',
        message: `What is your manager's name?`
    },
    {
        type: 'input',
        name: 'managerId',
        message: `What is your manager's ID?`
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: `What is your manager's Email?`
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: `What is your manager's office number?`
    },
    {
        type: 'list',
        name: 'addEngineer',
        message: `Would you like to add an engineer?`,
        choices: [`yes`, `no`],
    },
];

const engineerQuestions =[
    {
        type: 'input',
        name: 'engineerName',
        message: `What is your engineer's name?`
    },
    {
        type: 'input',
        name: 'engineerId',
        message: `What is your engineer's ID?`
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: `What is your engineer's email?`
    },
    {
        type: 'input',
        name: 'engineerGit',
        message: `What is your engineer's github username?`
    },
    {
        type: 'list',
        name: 'addEngineer',
        message: `Would you like to add another engineer?`,
        choices: [`yes`, `no`],
    },
]

inquirer.prompt(questions)
    .then((answers)=>{
        let addEngineer = answers.addEngineer;
        if (addEngineer === "yes"){
            buildEngineer();
        }else{
            console.log('time to add an intern');
        }
    })

const buildEngineer = () => {
        inquirer.prompt(engineerQuestions)
            .then((answers)=>{
                let addEngineer = answers.addEngineer;
                if (addEngineer === "yes"){
                    buildEngineer();
                }else{
                    console.log('time to add an intern');
                }
            });
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
