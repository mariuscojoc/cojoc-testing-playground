import { expect, test as setup } from "@playwright/test";

// This file is used to store the cookies session
// This way all the other tests will use them to automatically skip the login process
// Multiple signed in roles: https://playwright.dev/docs/auth#multiple-signed-in-roles

// NOTE: Run this file once on your local machine to create the cookie auth file

const login_page = 'https://store.steampowered.com/login/'

// steam account with "No Steam Guard" = nsg
// uncomment next 2 lines and change values with your own:
// const login_account_name_nsg = 'username';
// const login_password_nsg = 'password';

// steam account with Steam Guard active = sg
// uncomment next 2 lines and change values with your own:
// const login_account_name_sg = 'username';
// const login_password_sg = 'password';

const nsgUser = 'playwright/.auth/nsg_user.json';

setup("authenticate as user without Steam Guard", async ({ page }) => {
  
  // Perform authentication steps
  await page.goto(login_page);

  // enter account name
  await page.locator('#responsive_page_template_content input[type="text"]').click();
  await page.locator('#responsive_page_template_content input[type="text"]').fill(login_account_name_nsg);

  // enter password  
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill(login_password_nsg);

  // enable Remember Me option
  await page.getByText('Remember me').click();

  // click on sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  // check that user is signed in by checking the user account name is present on front page of the store
  await page.locator('#global_header').getByRole('link', { name: login_account_name_nsg }).isVisible();

  // End of authentication steps.

  await page.waitForURL("https://store.steampowered.com/");
  await page.context().storageState({ path: nsgUser });

});

const sgUser = 'playwright/.auth/sg_user.json';

setup("authenticate as user with Steam Guard active", async ({ page }) => {
  // Perform authentication steps
  await page.goto(login_page);

  // enter account name
  await page.locator('#responsive_page_template_content input[type="text"]').click();
  await page.locator('#responsive_page_template_content input[type="text"]').fill(login_account_name_sg);

  // enter password  
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill(login_password_sg);

  // enable Remember Me option
  await page.getByText('Remember me').click();

  // click on sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  // check that user is signed in by checking the user account name is present on front page of the store
  await page.locator('#global_header').getByRole('link', { name: login_account_name_sg }).isVisible();

  // End of authentication steps.

  await page.waitForURL("https://store.steampowered.com/");
  await page.context().storageState({ path: sgUser });

});