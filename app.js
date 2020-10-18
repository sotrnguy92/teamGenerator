const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employees = [];

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
        name: 'officeNumber',
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
];

const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: `What is your intern's name?`
    },
    {
        type: 'input',
        name: 'internId',
        message: `What is your intern's ID?`
    },
    {
        type: 'input',
        name: 'internEmail',
        message: `What is your intern's email?`
    },
    {
        type: 'input',
        name: 'internSchool',
        message: `What is your intern's School?`
    },
    {
        type: 'list',
        name: 'addIntern',
        message: `Would you like to add another intern?`,
        choices: [`yes`, `no`],
    },
]

inquirer.prompt(questions)
    .then((answers)=>{
        const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber)
        employees.push(manager);
        console.log(employees);
        let addEngineer = answers.addEngineer;
        if (addEngineer === "yes"){
            buildEngineer();
        }else{
            inquirer.prompt(
                {
                    type: 'list',
                    name: 'addIntern',
                    message: `Would you like to add an intern?`,
                    choices: [`yes`, `no`],
                },
            )
                .then(answers => {
                    let addIntern = answers.addIntern;
                    if (addIntern === "yes"){
                        buildIntern();
                    }
                });
        }
    })



const buildEngineer = () => {
        inquirer.prompt(engineerQuestions)
            .then((answers)=>{
                const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGit)
                employees.push(engineer);
                let addEngineer = answers.addEngineer;
                if (addEngineer === "yes"){
                    buildEngineer();
                }else{
                    inquirer.prompt(
                        {
                            type: 'list',
                            name: 'addIntern',
                            message: `Would you like to add an intern?`,
                            choices: [`yes`, `no`],
                        },
                    )
                        .then(answers => {
                            let addIntern = answers.addIntern;
                            if (addIntern === "yes"){
                                buildIntern();
                            }else{
                                buildHtml(employees)
                            }
                        })
                }
            });
};

const buildIntern = () => {
    inquirer.prompt(internQuestions)
        .then(answers => {
            const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            employees.push(intern);
            let addIntern = answers.addIntern;
            if (addIntern === "yes") {
                buildIntern();
            }else{
                buildHtml(employees);
            }
        });
}

const buildHtml = (emp) => {
    const htmlOut = render(emp);
    fs.writeFileSync(outputPath, htmlOut, 'utf-8')
    console.log(htmlOut);
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
