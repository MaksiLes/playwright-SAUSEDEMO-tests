import { test, expect } from '../fixtures/test_fixtures';
import { AuthPage } from '../pages/authPage';
import { user, products } from '../utils/test_data';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';

test.describe('Работаем с инветарем', () => {
  test('Проверка, что выбранный товар отображается в корзине', async ({ authPage }) => {
    const cartPage = new CartPage(authPage.page);
    await cartPage.goToCartPage(products.backpack);
    await expect(cartPage.cartItem).toBeVisible();
    await expect(cartPage.cartNumber).toHaveText('1');
  });

  test('Удаление товара из корзины', async ({ authPage }) => {
    const cartPage = new CartPage(authPage.page);
    await cartPage.removeCart(products.backpack);
    await expect(cartPage.itemRowByName(products.backpack)).toHaveCount(0);
  });

  test('Переход к оформлению заказа', async ({ authPage }) => {
    const cartPage = new CartPage(authPage.page);
    await cartPage.checkout(products.backpack);
    await expect(cartPage.page).toHaveURL(/checkout-step-one/);
    await expect(cartPage.checkoutInfo).toBeVisible();
  });
});
