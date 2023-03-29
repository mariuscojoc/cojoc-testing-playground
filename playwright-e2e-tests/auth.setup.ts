import { test as setup } from "@playwright/test";

// This file is used to store the cookies session into playwrite\.auth\user.json
// This way all the other tests will use them to automatically skip the login process

// NOTE: Run this file once on your local machine to create the cookie auth file

const authFile = "playwright/.auth/user.json";

const login_email = 'logani6666@fectode.com';
const login_password = 'Tm4cNHm6*8KbVQhneYj8';
const login_page = 'https://mariuscojocariu200.wixsite.com/cojoc-test-ground'

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(login_page);

  // press the log in button
  await page.getByRole('button', { name: 'Log In' }).click();

  // check that log in modal form has loaded
  await page.getByRole('heading', { name: 'Log In' }).click();

  // enter email
  await page.getByTestId('emailAuth').getByLabel('Email').click();
  await page.getByTestId('emailAuth').getByLabel('Email').fill('login_email');

  // enter password
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('login_password');

  // click on login button
  await page.getByTestId('submit').getByTestId('buttonElement').click();

  // End of authentication steps.

  await page.waitForURL("https://mariuscojocariu200.wixsite.com/cojoc-test-ground");
  await page.context().storageState({ path: authFile });
  
});