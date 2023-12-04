import fs from 'fs/promises';
import inquirer from 'inquirer';

// TODO: Create a function that returns a license badge based on which license is passed in
function renderLicenseBadge(license) {
  if (license === 'None') {
    return '';
  }

  const badge = `[![License: ${license}](https://img.shields.io/badge/License-${license}-yellow.svg)](https://opensource.org/licenses/${license})`;
  return badge;
}

// TODO: Create a function that returns the license link
function renderLicenseLink(license) {
  // Implement logic to return the appropriate license link based on the license parameter
}

// TODO: Create a function that returns the license section of README
function renderLicenseSection(license) {
  if (license === 'None') {
    return 'This project is not covered by any license.';
  }

  return `This application is covered by the [${license}](https://opensource.org/licenses/${license}) license.`;
}

// TODO: Create a function to generate markdown for README
async function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  const licenseLink = renderLicenseLink(data.license);
  const licenseSection = renderLicenseSection(data.license);

  return `# ${data.title}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
${licenseBadge}
${licenseSection}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
GitHub Profile: [${data.username}](https://github.com/${data.username})
Email: ${data.email}
`;
}

// Function to prompt the user for information
async function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter project title:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter project description:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your application:',
      choices: ['MIT', 'Apache', 'GPL', 'None'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter test instructions:',
    },
    {
      type: 'input',
      name: 'username',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
  ]);
}

// Function to save README content to a file
async function saveToFile(readmeContent) {
  const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, -5); // Generates a timestamp without colons
  const filename = `README_${timestamp}.md`;

  await fs.writeFile(filename, readmeContent);
  console.log(`${filename} file generated successfully!`);
}

// Main function
async function main() {
  try {
    // Prompt the user for information
    const userData = await promptUser();

    // Generate README content
    const readmeContent = await generateMarkdown(userData);

    // Save to README.md file
    await saveToFile(readmeContent);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the main function
main();