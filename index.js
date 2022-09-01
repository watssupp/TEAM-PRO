const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const jest = require('jest')

//Constructors
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');


const DIST_DIR = path.resolve(__dirname,'dist');
const outputPath = path.join(DIST_DIR, 'index.html');

const render = require('./src/page-template');
const { default: generate } = require('@babel/generator');

//Empty array fro teams and is place holders
const teamArr = [];
const idArr = [];

// Start app
function initApp(){

    // Prompts for manager
    function addManager() {
        console.log('Start building your team profile');
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the managers name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter the managers name.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the the managers ID?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid Managers ID.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the managers email?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Email address can not be empty.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the managers office number? (format: 111111111)",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a correct phone number.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamArr.push(manager);
            idArr.push(answers.managerId);
            addTeam();
        });
    }

    //Promts for end of manager
    function addTeam() {
        inquirer.prompt([
            {
                type:"list",
                name:"memberChoice",
                message: " Who would you like to add next?",
                choices: [
                    "Engineer",
                    "Intern",
                    "End app"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                    case "Intern":
                        addIntern();
                        break;
                        default:
                            generateHTML();
            }
        });
    }
// Prompts for Engineer when selected
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineers name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Engineers name can't be left empty.";
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the engineer's id?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a valid Engineers ID.";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Email address can not be empty.";
            }
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineers GitHub username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter the engineers GitHub username.";
            }
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        teamArr.push(engineer);
        idArr.push(answers.engineerId);
        addTeam();
    });
}

//Prompts when intern is selected
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What's the intern's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter at least one character.";
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is the interns id?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a valid Interns ID.";
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the interns email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Email address can not be empty.";
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the interns school?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a school.";
            }
        }

    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamArr.push(intern);
        idArr.push(answers.internId);
        addTeam();
    });
}

function generateHTML() {

    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR)
    }
    console.log("Generate Team Profile... ");
    fs.writeFileSync(outputPath,render(teamArr), "utf-8");
}

addManager();

}

initApp();