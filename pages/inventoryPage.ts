import { Locator, Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly itemInventory: Locator;
  readonly itemAddToCartButton: Locator;
  readonly itemRemoveFromCartButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemInventory = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.itemAddToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.itemRemoveFromCartButton = page.locator('#remove-sauce-labs-backpack');
  }

  public itemCardByName(name: string): Locator {
    return this.itemInventory.filter({ hasText: name });
  }

  async addItemsToCart(name: string) {
    await this.itemCardByName(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemsFromCart(name: string) {
    await this.itemCardByName(name).getByRole('button', { name: 'Remove' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortByName(value: string) {
    await this.sortSelect.selectOption(value);
  }
}
