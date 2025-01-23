import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TestUtils } from '../utils/TestUtils';

test('Task 1: Adjust items per page', async ({ page }) => {
  const homePage = new HomePage(page);
  const testUtils = new TestUtils(page);
  await homePage.navigateToHome();

  // Handle the Home screen pop up
  await testUtils.handleWelcomePopup();

  // Handle Cookies Pop-up
  await testUtils.handleCookiesPopup();

  await homePage.scrollToBottomUsingMouse();
  await homePage.setItemsPerPage('48');

  await page.waitForTimeout(5000);

  // Validate the item count
  const itemCount = await homePage.getItemCount();
  console.log(`Total items displayed: ${itemCount}`);
  expect(itemCount).toBeGreaterThanOrEqual(37);
});
