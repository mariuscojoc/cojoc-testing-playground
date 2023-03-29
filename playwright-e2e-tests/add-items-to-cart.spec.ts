import { test, expect, type Page } from '@playwright/test';

/*
Playwright Test creates an isolated Page object for each test. 
However, if you'd like to reuse a single Page object between 
multiple tests, you can create your own in test.beforeAll() 
and close it in test.afterAll().
*/

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {

  page = await browser.newPage();

});

// test.afterAll(async () => {
//   await page.close();
// });


test.describe('Adding a carrier company', () => {

  test('Navigate to website', async () => {
    
    await page.goto('https://mariuscojocariu200.wixsite.com/cojoc-test-ground');
    page.waitForLoadState('domcontentloaded');

  });


});

