import { test, expect } from '@playwright/test';

const default_profile_name = 'cojoc_testing';
const updated_profile_name = 'cojoc_testing_2';

test.describe('Update profile display country', () => {

  // use stored session cookie for user without steam guard
  test.use({ storageState: 'playwright/.auth/nsg_user.json' });

  test('', async ({ page }) => {

    // Navigate to the Steam store platform
    await page.goto('https://store.steampowered.com/');

    // Navigate to user profile page from top bar menu
    await page.locator('#account_pulldown').click();
    await page.getByRole('link', { name: 'View profile' }).click();

    // Check that default country France appears as location on profile page
    await page.getByText('France').isVisible();

    // Click on Edit Profile
    await page.getByRole('link', { name: 'Edit Profile', exact: true }).click();
    // Check that profile edit page has loaded
    await page.getByText('About', { exact: true }).isVisible();

    // Update location to a new country
    await page.locator('div').filter({ hasText: /^France$/ }).first().click();
    await page.getByText('Canada').click();

    // Click on Save button
    await page.getByRole('button', { name: 'Save' }).click();

    // Navigate to user profile page from top bar menu
    await page.locator('#account_pulldown').click();
    await page.getByRole('link', { name: 'View profile' }).click();

    // Check that default country France appears as location on profile page
    await page.getByText('Canada').isVisible();

  });

});