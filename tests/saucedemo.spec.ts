import { test, expect } from '@playwright/test';

test('Sauce Demo checkout flow', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Add first item to cart
  await page.click('.inventory_item:first-child [data-test="add-to-cart-sauce-labs-backpack"]');

  // Go to cart
  await page.click('.shopping_cart_link');

  // Start checkout
  await page.click('[data-test="checkout"]');

  // Fill checkout information
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  
  // Continue with checkout
  await page.click('[data-test="continue"]');

  // Finish checkout
  await page.click('[data-test="finish"]');

  // Verify order completion
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});