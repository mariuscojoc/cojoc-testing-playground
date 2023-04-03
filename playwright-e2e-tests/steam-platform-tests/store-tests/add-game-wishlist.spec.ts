import { test, expect } from '@playwright/test';

const video_game_title = 'Stardew Valley';

// use stored session cookie for user without steam guard
test.use({ storageState: 'playwright/.auth/nsg_user.json' });

test('Add a game to wishlis', async ({ page }) => {

  // Navigate to the Steam store platform
  await page.goto('https://store.steampowered.com/');

  // Search for a video game and navigate to its store page
  await page.getByPlaceholder('search').click();
  await page.getByPlaceholder('search').fill(video_game_title);
  await page.getByPlaceholder('search').press('Enter');
  await page.getByRole('link', { name: 'Stardew Valley 26 Feb, 2016' }).click();

  // Add the video game to your wishlist
  await page.getByRole('link', { name: 'Add to your wishlist' }).click();

  // Check confirmation message
  await page.getByText('Item added to your wishlist!').isVisible();

  // Navigate to user wishlist
  await page.getByRole('link', { name: 'STORE', exact: true }).hover();
  await page.getByRole('link', { name: 'Wishlist', exact: true }).click();

  // Check the the video game appears in the wishlist
  await page.getByText('video_game_title').isVisible();

  // Search for the video game in the wishlist
  await page.getByPlaceholder('Search by name or tag').click();
  await page.getByPlaceholder('Search by name or tag').fill(video_game_title);
  await expect(page.getByText(video_game_title)).toBeVisible();
  await page.getByPlaceholder('Search by name or tag').click();
  await page.getByPlaceholder('Search by name or tag').press('Enter');

  // Click on remove button on the result of the search
  await page.getByText('remove').click();

  // Check the confirmation message is for the searched video game title
  await page.getByText(`Are you sure you want to remove ${video_game_title} from your wishlist?It can be re`).isVisible();

  // Click on ok
  await page.getByText('OK', { exact: true }).click();

  // Check that there are no results for the searched item any longer
  await page.getByRole('heading', { name: 'Oops, there\'s nothing to show here' }).isVisible();

});