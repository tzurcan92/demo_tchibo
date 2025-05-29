import { test, expect } from '@playwright/test';

test.describe('Test suite for Checkout process', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.tchibo.de');

    const okButton = page.locator('#onetrust-accept-btn-handler');
    const maxWaitTime = 10000; // Maximum wait time in milliseconds (10 seconds)

    try {
      await okButton.waitFor({ state: 'visible', timeout: maxWaitTime });
      await okButton.click();
      console.log('Cookie banner accepted.');
    } catch (error) {
      console.log('Cookie banner did not appear within', maxWaitTime / 1000, 'seconds or was not found.');
    }
  });

  test('Home page loads successfully and displays logo and account icon', async ({ page }) => {
    await expect(page.locator('#c-header2020-icon--user')).toBeVisible();
  });

  test('Click the Kategorien tab in the navigation bar', async ({ page }) => {
    await expect(page.locator('.c-header2020-navigation')).toBeVisible();
    await page.locator('[data-cs-override-id="navigationMainItem_Kategorien"]').click();
    await expect(page).toHaveURL(/.*\/c\/categories/);
  });
});