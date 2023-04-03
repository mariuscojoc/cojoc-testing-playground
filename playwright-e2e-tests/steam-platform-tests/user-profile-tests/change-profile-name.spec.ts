import { test, expect } from '@playwright/test';

const default_profile_name = 'cojoc_testing';
const updated_profile_name = 'cojoc_testing_2';

test('Change profile display name', async ({ page }) => {

  // use stored session cookie for user without steam guard
  test.use({ storageState: 'playwright/.auth/nsg_user.json' });

  // Navigate to the Steam store platform
  await page.goto('https://store.steampowered.com/');

  // Navigate to user profile page from top bar menu
  await page.locator('#account_pulldown').click();
  await page.getByRole('link', { name: 'View profile' }).click();

  // Click on Edit Profile
  await page.getByRole('link', { name: 'Edit Profile', exact: true }).click();
  // Check that profile edit page has loaded
  await page.getByText('About', { exact: true }).isVisible();

  // Update the profile name
  await page.getByLabel('Profile Name').click();
  // Remove existing profile name
  await page.getByLabel('Profile Name').fill('');
  // Type in new profile name
  await page.getByLabel('Profile Name').fill(updated_profile_name);

  // Click on Save button
  await page.getByRole('button', { name: 'Save' }).click();

  // Navigate back to profile page
  await page.locator('#account_pulldown').click();
  await page.getByRole('link', { name: 'View profile' }).click();

  // Check that profile name is updated by text
  page.locator('#responsive_page_template_content').getByText('updated_profile_name').isVisible;

  // Change user profile back to default name
  // Click on Edit Profile
  await page.getByRole('link', { name: 'Edit Profile', exact: true }).click();
  // Check that profile edit page has loaded
  await page.getByText('About', { exact: true }).isVisible();

  // Update the profile name
  await page.getByLabel('Profile Name').click();
  // Remove existing profile name
  await page.getByLabel('Profile Name').fill('');
  // Type in new profile name
  await page.getByLabel('Profile Name').fill(default_profile_name);

  // Click on Save button
  await page.getByRole('button', { name: 'Save' }).click();

  // Navigate back to profile page
  await page.locator('#account_pulldown').click();
  await page.getByRole('link', { name: 'View profile' }).click();

  // Check that profile name has been updated to default name
  page.locator('#responsive_page_template_content').getByText('default_profile_name').isVisible;

});
