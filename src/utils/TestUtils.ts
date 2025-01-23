import { Page } from '@playwright/test';

export class TestUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page; // Initialize page instance
  }

  // Handle Welcome Pop-up
  async handleWelcomePopup() {
      await this.page.waitForTimeout(3000);
      const welcomePopup = this.page.locator('text=Welcome to OWASP Juice Shop!');
      if (await welcomePopup.isVisible()) {
        console.log('Handling Welcome Pop-up');
        await this.page.click('button:has-text("Dismiss")');
      }
  }

  // Handle Cookies Pop-up
  async handleCookiesPopup() {
      await this.page.waitForTimeout(2000);
      const cookiesButton = this.page.getByLabel("dismiss cookie message");
      await cookiesButton.waitFor({ state: 'visible', timeout: 10000 });
        if (await cookiesButton.isVisible()) {
            console.log('Handling Cookies Pop-up');
            // Click the "Me want it!" button
            await cookiesButton.click();
        } else {
            console.log('Cookies Pop-up not found');
        }
  }

  // Scroll to Bottom of the Page
  async scrollToBottom() {
    let previousHeight = await this.page.evaluate(() => document.body.scrollHeight);
    while (true) {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.waitForTimeout(1000); // Adjust delay for dynamic content loading
      const newHeight = await this.page.evaluate(() => document.body.scrollHeight);
      if (newHeight === previousHeight) {
        console.log('Reached the bottom of the page.');
        break;
      }
      previousHeight = newHeight;
    }
  }
}
