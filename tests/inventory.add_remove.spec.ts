import { test, expect } from '../fixtures/test_fixtures';
import { AuthPage } from '../pages/authPage';
import { user, products } from '../utils/test_data';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Работаем с инветарем', () => {
  test('Проверка, что нужный товар есть в инвентаре', async ({ authPage }) => {
    const inventory = new InventoryPage(authPage.page);
    const itemVisible = inventory.itemCardByName(products.backpack);
    await expect(itemVisible).toBeVisible();
  });

  test('Добавление одного товара в корзину', async ({ authPage }) => {
    const inventory = new InventoryPage(authPage.page);
    await inventory.addItemsToCart(products.backpack);
    await expect(inventory.itemRemoveFromCartButton).toHaveText('Remove');
    await expect(inventory.cartBadge).toBeVisible();
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('Добавление двух товаров в корзину', async ({ authPage }) => {
    const inventory = new InventoryPage(authPage.page);
    await inventory.addItemsToCart(products.backpack);
    await inventory.addItemsToCart(products.bikeLight);
    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('Удалить товар из корзины', async ({ authPage }) => {
    const inventory = new InventoryPage(authPage.page);
    await inventory.addItemsToCart(products.backpack);
    await inventory.removeItemsFromCart(products.backpack);
    await expect(inventory.itemCardByName(products.backpack).getByRole('button')).toHaveText(
      'Add to cart',
    );
    await expect(inventory.cartBadge).toBeHidden();
  });

  test('Переход в корзину', async ({ authPage }) => {
    const inventory = new InventoryPage(authPage.page);
    await inventory.addItemsToCart(products.backpack);
    await inventory.goToCart();
    await expect(authPage.page).toHaveURL(/\/cart/);
  });

  test('Сортировка по прайсу', async ({ authPage }) => {
    const inventory = new InventoryPage(authPage.page);
    await inventory.sortByName('lohi');
    await expect(inventory.sortSelect).toHaveValue('lohi');
  });
});
