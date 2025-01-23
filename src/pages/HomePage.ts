import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Navigate to Home screen
  async navigateToHome() {
    await this.page.goto('/');
  }

  //Scroll to the bottom of the Home screen
  async scrollToBottomUsingMouse() {
  for (let i = 0; i < 10; i++) {
    await this.page.mouse.wheel(0, 1000);
    await this.page.waitForTimeout(500);
  }
}

  //Select the max page count
  async setItemsPerPage(count: string) {
  await this.page.getByLabel('Items per page:').locator('div').nth(3).click();
  await this.page.getByText(count).click();
}

  //Verify if the total items count is same as displayed in the Page count
  async getItemCount() {
    return this.page.locator('.product').count();
  }
}
