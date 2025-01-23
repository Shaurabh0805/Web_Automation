import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { TestUtils } from '../utils/TestUtils';

test('Task 2: Product popup and reviews', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const testUtils = new TestUtils(page);

  await homePage.navigateToHome();

  // Handle the Home screen pop up
  await testUtils.handleWelcomePopup();

  // Handle Cookies Pop-up
  await testUtils.handleCookiesPopup();

  //Click in the Apple juice product
  await productPage.openProduct('Apple Juice (1000ml)');
  await page.waitForTimeout(1000);

  //Verify if the product pop up is opened
  expect(await productPage.isPopupVisible()).toBeTruthy();

  //Verify if the correct product image is displayed
  expect(await productPage.isProductImageVisible("Apple Juice (1000ml)")).toBeTruthy();

  //Expand reviews if available
  await productPage.clickOnReviewIfAvailable();

  await page.waitForTimeout(3000);
  await homePage.scrollToBottomUsingMouse();
  await page.waitForTimeout(3000);
  await productPage.closePopup();
});
