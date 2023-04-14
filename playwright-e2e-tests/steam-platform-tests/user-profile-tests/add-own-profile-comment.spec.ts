import { test, expect } from '@playwright/test';

test.describe('Add a comment on own profile as user without steam guard', () => {

  // use stored session cookie for user without steam guard
  test.use({ storageState: 'playwright/.auth/nsg_user.json' });

  test('', async ({ page }) => {

    // Navigate to the Steam store platform
    await page.goto('https://store.steampowered.com/');

    // Navigate to user profile page from top bar menu
    await page.locator('#account_pulldown').click();
    await page.getByRole('link', { name: 'View profile' }).click();

    // Leave a comment on your own user profile currently logged in
    await page.getByPlaceholder('Add a comment').click();
    await page.getByPlaceholder('Add a comment').fill('Hi this is a comment on my own profile without steam guard active.');
    await page.locator('.no_header').click();
    await page.getByText('Post Comment').click();

    // Check error message due to steam guard off on account
    await page.getByText('Sorry, some kind of error has occurred: To post this comment, your account must ').isVisible();

  });

});

test.describe('Add a comment on own profile as user with steam guard active', () => {

  // use stored session cookie for user without steam guard
  test.use({ storageState: 'playwright/.auth/sg_user.json' });

  test('', async ({ page }) => {

    // Navigate to the Steam store platform
    await page.goto('https://store.steampowered.com/');

    // Navigate to user profile page from top bar menu
    await page.locator('#account_pulldown').click();
    await page.getByRole('link', { name: 'View profile' }).click();

    // Leave a comment on your own user profile currently logged in
    await page.getByPlaceholder('Add a comment').click();
    await page.getByPlaceholder('Add a comment').fill('Hello world');
    await page.locator('.no_header').click();
    await page.getByText('Post Comment').click();

    // Check that comment has been made and appears on user profile
    await page.getByText('Hello world').isVisible();

    const commentLocator = page.locator('#Hello world');
    const commentId = await commentLocator.getAttribute('id');
    console.log(commentId);

    // Delete comment and check it is removed:
    // Still banging my head against this one, the comments have unique ids in every instance
    // so need to work with dynamic content, somehow save the div id of the comment and check based on them
    // https://www.neovasolutions.com/2023/01/19/how-to-handle-dynamic-web-tables-in-playwright/#:~:text=In%20Playwright%20we%20can%20handle%20dynamic%20web%20tables,just%20like%20a%20for%20loop%20and%20if%20condition.

  });

});