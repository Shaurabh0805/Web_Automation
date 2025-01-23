import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLogin() {
    await this.page.goto('https://juice-shop.herokuapp.com/#/login');
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('Text field for the login email').click();
    await this.page.getByLabel('Text field for the login email').fill(email);
    await this.page.getByLabel('Text field for the login password').click();
    await this.page.getByLabel('Text field for the login password').fill(password);
    //await this.page.getByLabel('Login').click();
    //await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.locator('button#loginButton').click();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.page.locator('h1:has-text("Login")').isVisible();
  }
}
