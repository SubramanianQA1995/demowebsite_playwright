import { test, expect } from '@playwright/test';

test('should create and schedule a meme post', async ({ page }) => {
  // Navigate to the meme search page
  await page.goto('https://ic-dev.lightersideofrealestate.com/search?type=Memes&cid=116117');
  
  // Navigate to calendar page
  await page.goto('https://ic-dev.lightersideofrealestate.com/react-content-calendar');
  
  // Wait for page to load and click Create Post button
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Create Post' }).click();
  
  // Wait for the create post modal to be visible
  await page.waitForSelector('.modal-content', { state: 'visible' });
  
  // Click the social account dropdown and wait for it to be visible
  await page.getByTestId('select-social-account').click();
  await page.waitForTimeout(1000); // Wait for dropdown to fully expand
  
  // Select the first account from the dropdown (adjust selector based on actual structure)
  await page.getByRole('option').first().click();
  
  // Click the Real Estate Meme button
  await page.getByRole('button', { name: 'Real Estate Meme' }).click();
  
  // Wait for meme grid to load and select the second meme
  await page.waitForSelector('.meme-grid', { state: 'visible' });
  const memes = await page.locator('.meme-item');
  await memes.nth(1).click();
  
  // Click Add to Post button
  await page.getByRole('button', { name: 'Add to Post' }).click();
  
  // Wait for preview to load and click Schedule Post
  await page.waitForSelector('.preview-area', { state: 'visible' });
  await page.getByRole('button', { name: 'Schedule Post' }).click();
  
  // Wait for success message
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('.success-message')).toContainText('success');
  
  // Close the popup
  await page.getByRole('button', { name: 'Close' }).click();
  
  // Verify the post appears on calendar
  await expect(page.locator('.calendar-cell').filter({ hasText: 'Meme Post' })).toBeVisible();
});