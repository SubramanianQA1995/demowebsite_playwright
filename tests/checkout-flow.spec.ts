import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  // Navigate to saucedemo and login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Add item to cart
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  // Fill checkout information
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');

  // Complete checkout process
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');

  // Verify order completion
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});