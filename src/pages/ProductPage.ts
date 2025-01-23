import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openProduct(productName: string) {
  await this.page
    .locator('mat-card')
    .filter({ hasText: `${productName}` }) // Use backticks for template literals
    .getByLabel('Click for more information')
    .click();
}

  async isPopupVisible() {
    return this.page.locator('.mat-dialog-container').isVisible();
  }

  async isProductImageVisible(imageAlt: string) {
    const imageLocator = this.page
    .locator('.mat-dialog-container') // Use the popup container as context
    .locator(`img[alt="${imageAlt}"]`);
  return await imageLocator.isVisible();
  }

  async expandReview() {
    await this.page.click('text=Reviews');
  }

  async clickOnReviewIfAvailable() {
  // Locate the review button regardless of the number of reviews
  const reviewButton = this.page.getByRole('button', { name: /Reviews \(\d+\)/ }); // Regex to match 'Reviews (x)'

  // Check if the review button is visible
  if (await reviewButton.isVisible()) {
    console.log('Review button is available. Clicking on it.');
    await reviewButton.click(); // Click the review button
  } else {
    console.log('Review button is not available.');
  }
}

  async closePopup() {
    await this.page.click('button:has-text("Close")');
  }
}
