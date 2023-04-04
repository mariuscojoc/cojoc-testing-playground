import { test, expect } from '@playwright/test';

const video_game_title = 'Rimworld';
const workshop_item_title = 'Wall Light';
const user_profile_name_sg = 'cojoc_testing_sg'

// use stored session cookie for user without steam guard
test.use({ storageState: 'playwright/.auth/sg_user.json' });

test('Subscribing to a workshop game item', async ({ page }) => {

  // Navigate to the Steam store platform
  await page.goto('https://store.steampowered.com/');

  // Go to community tab
  await page.getByRole('link', { name: 'COMMUNITY', exact: true }).click();

  // Go to workshop section
  await page.getByRole('link', { name: 'Workshop' }).click();

  // View all available workshop games
  await page.getByRole('link', { name: 'View all available Workshops' }).click();

  // Search for video game
  await page.locator('#workshopSearchText').click();
  await page.locator('#workshopSearchText').fill(video_game_title);
  await page.locator('#workshopSearchText').press('Enter');
  await page.getByText('RimWorld').click();

  // See all popular items
  await page.getByRole('link', { name: 'See all Popular Items' }).click();

  // Filter most popular items of all time
  await page.locator('#profileBlock').getByRole('link', { name: 'One Week' }).click();
  await page.getByRole('link', { name: 'All Time' }).click();

  // Click the first entry from the list
  await page.locator('.ugc').first().click();

  // Click the subscribe button of the item
  await page.locator('#SubscribeItemBtn').click();

  // Check the subscription confirmation messsage
  await page.getByText('This item has been added to your Subscriptions.').isVisible();

  // Check that the subscribed button changed to "Subscribed"
  await page.getByText("Subscribed").isVisible();

  // Check that the item appears in the user list of subscribed workshop items
  // Navigate to user home page
  await page.locator('#global_header').getByRole('link', { name: user_profile_name_sg }).click();

  // navigate to user workshop section
  await page.getByRole('link', { name: 'My Workshop' }).click();

  // Navigate to user subscribed items
  await page.getByRole('link', { name: 'Subscribed Items' }).click();

  // Check that the item subscribed appear in the user subscription list
  await page.getByText(workshop_item_title).isVisible();

  // Unsubscribe from the item\
  await page.getByText('Subscribe Unsubscribe Subscribed').click();

  // Check unsubscribe message confirmation
  await page.getByText('You are now unsubscribed from: Wall Light RimWorld').isVisible();

});