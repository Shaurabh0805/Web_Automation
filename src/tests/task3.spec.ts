import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { TestUtils } from '../utils/TestUtils';

test('Task 3: User Registration and Login', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const loginPage = new LoginPage(page);
  const testUtils = new TestUtils(page);

  // Navigate to the registration page
  await registrationPage.navigateToRegistration();

  // Handle the Home screen pop up
  await testUtils.handleWelcomePopup();

  // Handle Cookies Pop-up
  await testUtils.handleCookiesPopup();

  // Trigger validation errors
  await registrationPage.triggerValidationErrors();
  //await page.waitForTimeout(5000);

  // Verify the Password Hint messages
  await registrationPage.verifyPasswordHints();

  // Register a new user
  const email = `user${Date.now()}@example.com`;
  const password = 'Password1!';
  const securityAnswer = 'abc';
  await registrationPage.registerUser(email, password, securityAnswer);

  // Log in with the registered user
  await loginPage.navigateToLogin();
  await loginPage.login(email, password);

  // Assert login success
  expect(await loginPage.isLoggedIn()).toBeTruthy();
});
