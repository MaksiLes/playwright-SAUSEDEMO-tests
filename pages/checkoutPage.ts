import { Locator, Page, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { user, products, dataVerification } from '../utils/test_data';

export class CheckoutPage {
  readonly page: Page;
  readonly cartPage: CartPage;
  readonly inventoryPage: InventoryPage;
  readonly checkoutButton: Locator;
  readonly cartLink: Locator;
  readonly checkoutInfo: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cartItem: Locator;
  readonly error: Locator;
  readonly totalSum: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartPage = new CartPage(page);
    this.inventoryPage = new InventoryPage(page);
    this.checkoutButton = page.locator('#checkout');
    this.cartLink = page.locator('.shopping_cart_link');
    this.checkoutInfo = page.locator('.checkout_info');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cartItem = page.locator('.cart_item');
    this.error = page.locator('[data-test="error"]');
    this.totalSum = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
    this.homeButton = page.locator('#back-to-products');
  }

  async checkoutStart() {
    for (const product of Object.values(products)) {
      await this.inventoryPage.addItemsToCart(product);
    }
    await this.cartLink.click();
    await this.checkoutButton.click();
  }

  async dataVerification(name: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async correctDisplayOfProducts() {
    await this.dataVerification(
      dataVerification.validData.firstName,
      dataVerification.validData.lastName,
      dataVerification.validData.postalCode,
    );
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}
