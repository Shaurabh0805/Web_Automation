import { Page } from '@playwright/test';

export class RegistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToRegistration() {
    await this.page.goto('https://juice-shop.herokuapp.com/#/register');
  }

  async triggerValidationErrors() {

  const passwordAdviceToggle = this.page.locator('label[for="mat-slide-toggle-1-input"]'); // Update selector if necessary
  const isChecked = await this.page.locator('#mat-slide-toggle-1-input').isChecked();
  if (!isChecked) {
    await passwordAdviceToggle.click();
    console.log('Set "Show password advice" to ON.');
  } else {
    console.log('"Show password advice" is already ON.');
  }

  const inputs = this.page.locator('input');
  console.log(`Found ${await inputs.count()} input elements.`);

  // Trigger validation errors for all input fields
  for (let i = 1; i < await inputs.count()-2; i++) {
    if (await inputs.nth(i).isVisible()) {
      await inputs.nth(i).click();
      await this.page.waitForTimeout(3000);
    } else {
      console.log(`Input ${i} is not visible.`);
    }
  }

  // Handle the dropdown field
  const dropdown = this.page.locator('#registration-form div').filter({ hasText: 'Security Question *' }).nth(3);; // Update selector as needed
  if (await dropdown.isVisible()) {
    console.log('Interacting with dropdown...');
    await this.page.waitForTimeout(3000);
    await dropdown.click();
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Escape');
  } else {
    console.log('Dropdown is not visible.');
  }

  await this.page.waitForTimeout(3000);
  await this.page.click('input#securityAnswerControl');
  await this.page.waitForTimeout(3000);
  await this.page.click('input#emailControl');
  //await this.page.waitForTimeout(3000);

}

async verifyPasswordHints() {
  // Array of expected hint messages
  const expectedHints = [
    'errorcontains at least one lower character',
    'errorcontains at least one upper character',
    'errorcontains at least one digit',
    'errorcontains at least one special character',
    'errorcontains at least 8 characters',
  ];

  // Locate the password hints container
  const passwordHints = this.page.locator('div.info-row.ng-tns-c29-15');

  // Verify the hints count
  const hintCount = await passwordHints.count();
  if (hintCount !== expectedHints.length) {
    throw new Error(`Expected ${expectedHints.length} hints, but found ${hintCount}`);
  }

  // Verify hint message text
  for (let i = 0; i < expectedHints.length; i++) {
    const hintText = await passwordHints.nth(i).textContent();
    if (hintText?.trim() !== expectedHints[i]) {
      throw new Error(`Hint ${i + 1} does not match. Expected: "${expectedHints[i]}", Found: "${hintText?.trim()}"`);
    }
    console.log(`Verified hint ${i + 1}: "${hintText}"`);
  }

  console.log('All password hints verified successfully.');
}

  async registerUser(email: string, password: string, securityAnswer: string) {
  // Fill the Email field
  await this.page.getByLabel('Email address field').click();
  await this.page.getByLabel('Email address field').fill(email);
  console.log('User email - ' + email);

  // Fill the Password field
  await this.page.getByLabel('Field for the password').click();
  await this.page.getByLabel('Field for the password').fill(password);

  // Fill the Repeat Password field
  await this.page.locator('div').filter({ hasText: /^Repeat Password \*$/ }).nth(1).click();
  await this.page.getByLabel('Field to confirm the password').click();
  await this.page.getByLabel('Field to confirm the password').fill(password);
  console.log('User password - ' + password);

  // Select the Security Question
  await this.page.locator('#registration-form div').filter({ hasText: 'Security Question *' }).nth(3).click();
  await this.page.getByText('Your eldest siblings middle').click(); // Update option text if needed

  // Fill the Security Answer
  await this.page.getByPlaceholder('Answer to your security').click();
  await this.page.getByPlaceholder('Answer to your security').fill(securityAnswer);

  // Submit the form
  await this.page.locator('button#registerButton').click();

  console.log('User registration form submitted successfully.');
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    const successMessage = this.page.locator('.mat-simple-snack-bar-content');
    return await successMessage.isVisible();
  }
}
