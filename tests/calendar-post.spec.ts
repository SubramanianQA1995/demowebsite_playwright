import { test, expect } from '@playwright/test';

test('Schedule a meme post on calendar', async ({ page }) => {
  // Navigate to the meme search page and wait for authentication
  await page.goto('https://ic-dev.lightersideofrealestate.com/search?type=Memes&cid=116117');
  await page.waitForLoadState('networkidle');
  
  // Click the calendar icon from navigation
  await page.getByRole('link', { name: 'Calendar' }).click();
  await page.waitForURL('https://ic-dev.lightersideofrealestate.com/react-content-calendar');
  await page.waitForLoadState('networkidle');

  // Wait for calendar to be fully loaded
  await page.waitForSelector('.calendar-day', { state: 'visible' });

  // Find and hover over April 10, 2025 cell
  // First find the cell containing April 10
  const targetCell = page.locator('.calendar-day', { hasText: '10' });
  await targetCell.hover();
  
  // Wait for the + button to appear and click it
  const addButton = page.locator('.calendar-day', { hasText: '10' }).locator('.add-post-button');
  await addButton.waitFor({ state: 'visible' });
  await addButton.click();

  // Wait for the create post modal
  await page.waitForSelector('.create-post-modal', { state: 'visible' });

  // Click the social account dropdown
  await page.locator('.account-select-dropdown').click();
  
  // Select the first account from the dropdown
  await page.locator('.account-option').first().click();

  // Click the Real Estate Meme button
  await page.getByRole('button', { name: 'Real Estate Meme' }).click();

  // Wait for meme grid and select second meme
  await page.waitForSelector('.meme-container');
  const memes = page.locator('.meme-item');
  await memes.nth(1).click();

  // Click Add to Post
  await page.getByRole('button', { name: 'Add to Post' }).click();

  // Wait for image to be loaded in preview
  await page.waitForSelector('.post-preview-image');

  // Click Schedule Post
  await page.getByRole('button', { name: 'Schedule Post' }).click();

  // Wait for success toast/message
  await page.waitForSelector('.success-toast', { state: 'visible' });
  const successMessage = await page.locator('.success-toast').textContent();
  expect(successMessage?.toLowerCase()).toContain('success');

  // Close the modal
  await page.locator('.modal-close-button').click();

  // Verify scheduled post appears on calendar
  const scheduledPost = page.locator('.calendar-day', { hasText: '10' }).locator('.scheduled-content');
  await expect(scheduledPost).toBeVisible();
});