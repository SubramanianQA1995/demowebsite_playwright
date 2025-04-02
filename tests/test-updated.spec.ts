import { test, expect } from '@playwright/test';

// Hooks: Before Each Test - Navigates to login page & clears session

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.evaluate(() => localStorage.clear());
});

// Hooks: After Each Test - Logout if logged in

test.afterEach(async ({ page }) => {
  if (await page.locator('[data-test="logout-sidebar-link"]').isVisible()) {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
  }
});

// Test Case 1: Successful Login & Logout

test('Successful login and logout', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('.title')).toHaveText('Products');
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page.locator('[data-test="login-button"]').first()).toBeVisible();
});

// Test Case 2: Invalid Login - Incorrect Credentials

test('Invalid login attempt', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('wrong_user');
  await page.locator('[data-test="password"]').fill('wrong_pass');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Test Case 3: Add products to cart and checkout successfully

test('Add product to cart and checkout', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Mani');
  await page.locator('[data-test="lastName"]').fill('Raja');
  await page.locator('[data-test="postalCode"]').fill('282883');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

// Test Case 4: Checkout with missing details

test('Checkout should fail if user details are missing', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click(); // Clicking Continue without filling details
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// Test Case 5: Remove items from the cart

test('Remove items from cart', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});
