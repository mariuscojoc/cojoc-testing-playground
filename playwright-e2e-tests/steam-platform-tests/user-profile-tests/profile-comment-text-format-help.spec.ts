import { test, expect } from '@playwright/test';

test('Check the comment text formatting help window', async ({ page }) => {

  // use stored session cookie for user without steam guard
  test.use({ storageState: 'playwright/.auth/nsg_user.json' });

  // Navigate to the Steam store platform
  await page.goto('https://store.steampowered.com/');

  // Navigate to user profile page from top bar menu
  await page.locator('#account_pulldown').click();
  await page.getByRole('link', { name: 'View profile' }).click();

  // Leave a comment on your own user profile currently logged in
  await page.getByPlaceholder('Add a comment').click();
  await page.getByPlaceholder('Add a comment').fill('Hi this is a comment on my own profile.');
  await page.locator('.no_header').click();

  // Click on Formatting help button
  await page.getByRole('link', { name: 'Formatting help' }).click();

  // Check thast the Formatting Help modal is displayed
  await page.getByText('These markup tags allow you to add formatting to the text of your comments and p').isVisible();

  // Close the Formatting Help modal using X button
  await page.locator('.newmodal_close').click();

  // Check that Formatting help modal is closed
  await page.getByText('These markup tags allow you to add formatting to the text of your comments and p').isHidden();

  // Click on Formatting help button
  await page.getByRole('link', { name: 'Formatting help' }).click();

  // Check thast the Formatting Help modal is displayed
  await page.getByText('These markup tags allow you to add formatting to the text of your comments and p').isVisible();

  // Close the Formatting Help modal using X button
  await page.getByText('OK', { exact: true }).click();

  // Check that Formatting help modal is closed
  await page.getByText('These markup tags allow you to add formatting to the text of your comments and p').isHidden();

});