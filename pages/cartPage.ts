import { Locator, Page, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';

export class CartPage {
  readonly page: Page;
  readonly inventoryPage: InventoryPage;
  readonly cartLink: Locator;
  readonly cartItem: Locator;
  readonly cartNumber: Locator;
  readonly removeItem: Locator;
  readonly checkoutButton: Locator;
  readonly checkoutInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.inventoryPage = new InventoryPage(page);
    this.cartItem = page.locator('.cart_item');
    this.cartNumber = page.locator('.cart_quantity');
    this.removeItem = page.getByRole('button', { name: 'Remove' });
    this.checkoutButton = page.locator('#checkout');
    this.checkoutInfo = page.locator('.checkout_info');
  }

  async goToCartPage(name: string) {
    await this.inventoryPage.addItemsToCart(name);
    await this.cartLink.click();
  }

  itemRowByName(name: string) {
    return this.cartItem.filter({ hasText: name });
  }

  foundButtenRemove(name: string) {
    return this.itemRowByName(name).getByRole('button', { name: 'Remove' });
  }

  async removeCart(name: string) {
    await this.inventoryPage.addItemsToCart(name);
    await this.cartLink.click();
    await this.foundButtenRemove(name).click();
  }

  async checkout(name: string) {
    await this.inventoryPage.addItemsToCart(name);
    await this.cartLink.click();
    await this.checkoutButton.click();
  }
}
