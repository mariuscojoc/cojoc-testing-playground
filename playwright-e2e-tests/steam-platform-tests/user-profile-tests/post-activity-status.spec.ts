import { test, expect } from '@playwright/test';

const comment_text = 'Hello this is a status comment to my friends!';
const user_profile_name_sg = 'cojoc_testing_sg'

// use stored session cookie for user without steam guard
test.use({ storageState: 'playwright/.auth/sg_user.json' });

test('Post a status to friends', async ({ page }) => {

  // Navigate to the Steam store platform
  await page.goto('https://store.steampowered.com/');

  // Navigate to user activity page by clicking on user name on top bar menu
  await page.locator('#global_header').getByRole('link', { name: 'cojoc_testing_sg' }).click();

  // write a status comment
  await page.getByPlaceholder('Post a status to your friends...').click();
  await page.getByPlaceholder('Post a status to your friends...').fill('Hello this is a status comment to my friends!');
  // add the first available emote from the list at the end of the comment
  await page.locator('#blotter_statuspost_form span').nth(2).click();
  await page.locator('.emoticon').first().click();

  // Submit the comment
  await page.getByText('Post').click();

  // Check that the comment appears in the main activity page
  await page.getByText('Hello this is a status comment to my friends!').isVisible();

  // Navigate to the My activity section
  await page.getByRole('link', { name: 'My Activity' }).click();

  // Check that the submitted comment is also visible here
  await page.getByText('Hello this is a status comment to my friends!').isVisible();

  // clear testing data by deleting the comment
  // Accept the browser pop-up dialogue when asked to delete the comment
  page.once('dialog', dialog => {
    dialog.accept().catch(() => { });
  });

  await page.getByRole('link', { name: 'Delete post' }).click();

  // Check that the comment is not available any longer
  await page.getByText('Hello this is a status comment to my friends!').isHidden();

});