
# Cojoc's Testing Playground

This repository is meant to track my work of automating the Steam store using Playwright with TypeScript. At the same time this serves as part of my personal portofolio where I demonstrate my knowledge of automating E2E FrontEnd tests.
## 🚀 About Me
Hi 👋, I'm Cojoc.

I'm a passionate QA Engineer that likes to play around with automating testing.


## Installation steps

Clone this project in your IDE of choice (I use Visual Studio Code).

Install Playwright using your choice of command as per https://playwright.dev/docs/intro

Select TypeScript when prompted.

Write down "playwright-e2e-tests" when asked where to put the default end-to-end example tests.

Select yes when asked to add GitHub Actions workflow.

Select Yes when prompted to install Playwright browsers.

Select No when asking to overide the existing playwright.config.ts

Select No when asking to overide the existing playwright.yml

Delete the example.spec.ts created by default from the Playwright instalation.


## Environment Variables

To avoid using a log in step in every test, you will need to generate a session authenticated state as per https://playwright.dev/docs/auth. The project makes use of the "Multiple signed in roles" concept since multiple accounts are required to test features behaving differently depending on their status.

For this go to "auth.setup.ts" and uncomment lines 13-14 and 18-19.

Replace username and password with your own testing accounts as per required specifications: one steam account that has Steam Guard deactivated and another account with it activated.

Alternative: create a user_credentials.ts file where you include the variables for the accounts and afterwards add user_credentials.ts to your gitignore.

Create a folder "playwright/.auth" in main project root.

Execute the setup file with command line:

```bash
  npx playwright test auth.setup.ts
```

Notice that two json files will be created in the playwright/.auth directory: nsg_user.json and sg_user.json

![App Screenshot](https://i.imgur.com/6k051Qp.png)

From here on any E2E tests that require log in of a user will be using the stored authenticated sessions.

Note: whenever there's a change to the user credentials, such as a new account name or password, or a different account, make sure to run the auth.setup.ts at least once, this way the json files will be updated with the new stored sessions.




## Running Tests

Playwright extensive docummentation on running tests available here: https://playwright.dev/docs/running-tests

To run all the tests in your project, run the following command:

```bash
  npx playwright test
```

Or run a single test file using following command:

```bash
  npx playwright test example.spec.ts
```

Running tests can be made easier using the Visual Studio Code extension "Playwright Test for VSCode": https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

This extension adds a convenient play button next to each test.describe or test inside your files:

![App Screenshot](https://i.imgur.com/2FoSxwB.png)

