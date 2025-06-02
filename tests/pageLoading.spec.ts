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

test('Add product to cart and click "Login and order" button', async ({ page }) => {
  // Step 1: Ensure the header navigation is visible
  await expect(page.locator('.c-header2020-navigation')).toBeVisible();

  // Step 2: Click the "Kategorien" tab using the correct selector
  const kategorienTab = page.locator('[data-cs-override-id="navigationMainItem_Kategorien"]');
  await kategorienTab.click();

  // Step 3: Assert that the URL contains "/categories"
  await expect(page).toHaveURL(/\/c\/categories/);

  // Step 4: Wait for teaser grid to be visible
  await page.waitForSelector('[data-testid="teaser-grid"] .teaser-grid__item a.teaser__image-overlay-container');

  // Step 5: Click the first available category teaser
  const firstCategoryLink = page
  .locator('[data-testid="teaser-grid"] .teaser-grid__item a.teaser__image-overlay-container')
  .first();
  await expect(firstCategoryLink).toBeVisible();
  await firstCategoryLink.click();

  // Step 6: Wait for the product grid to load
  const firstProductTile = page.locator('.product-tile').first();
  await expect(firstProductTile).toBeVisible();

  // Step 7: Find and click the basket button inside the first product tile
  const basketButton = firstProductTile.locator('button.cart-button');
  await expect(basketButton).toBeVisible();
  await basketButton.click();

  // Step 8: Verify product details modal appears
  const modalDialog = page.locator('div.tp-modal-content[role="dialog"]');
  await expect(modalDialog).toBeVisible();

  const buyBoxModal = page.locator('.pdp-buybox');
  await expect(buyBoxModal).toBeVisible();

  // Step 9: Click the "In den Warenkorb" button inside the modal
  const modalAddToCartButton = modalDialog.locator('button.tp-button:has-text("In den Warenkorb")');
  await expect(modalAddToCartButton).toBeVisible();
  await modalAddToCartButton.click();
  
 // Step 10: Verify the add-to-cart confirmation modal appears
  const confirmationModal = page.locator('.pdp-add-to-cart-modal__notification--success');
  await expect(confirmationModal).toBeVisible();
  await expect(confirmationModal).toHaveText('Artikel zum Warenkorb hinzugefügt');

});
});