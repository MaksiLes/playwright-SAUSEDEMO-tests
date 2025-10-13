import { test, expect } from '../fixtures/test_fixtures';
import { user, products, dataVerification } from '../utils/test_data';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('', () => {
  test('Проверка, что товары в корзине', async ({ authPage }) => {
    const checkoutPage = new CheckoutPage(authPage.page);
    await checkoutPage.checkoutStart();
    await expect(checkoutPage.page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.checkoutInfo).toBeVisible();
  });

  test('Успешный ввод данных и переход к Step Two', async ({ authPage }) => {
    const checkoutPage = new CheckoutPage(authPage.page);
    await checkoutPage.checkoutStart();
    await checkoutPage.dataVerification(
      dataVerification.validData.firstName,
      dataVerification.validData.lastName,
      dataVerification.validData.postalCode,
    );
    await expect(checkoutPage.page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.cartItem).toHaveCount(3);
  });

  test('Ошибки при вводе невалидных данных', async ({ authPage }) => {
    const checkoutPage = new CheckoutPage(authPage.page);
    await checkoutPage.checkoutStart();
    await checkoutPage.dataVerification('', '', '');
    await expect(checkoutPage.page).toHaveURL(/checkout-step-one/);
    await expect(checkoutPage.error).toHaveText('Error: First Name is required');
  });

  test('Корректное отображение выбранных товаров  и суммы', async ({ authPage }) => {
    const checkoutPage = new CheckoutPage(authPage.page);
    await checkoutPage.checkoutStart();
    await checkoutPage.correctDisplayOfProducts();
    await expect(checkoutPage.cartItem).toHaveCount(3);
    await expect(checkoutPage.cartItem.nth(0)).toContainText(products.backpack);
    await expect(checkoutPage.cartItem.nth(1)).toContainText(products.bikeLight);
    await expect(checkoutPage.cartItem.nth(2)).toContainText(products.boltTShirt);
    await expect(checkoutPage.totalSum).not.toBeEmpty();
    await expect(checkoutPage.totalSum).toHaveText('Total: $60.45');
    await expect(checkoutPage.finishButton).toBeVisible();
  });

  test('Завершение заказа', async ({ authPage }) => {
    const checkoutPage = new CheckoutPage(authPage.page);
    await checkoutPage.checkoutStart();
    await checkoutPage.dataVerification(
      dataVerification.validData.firstName,
      dataVerification.validData.lastName,
      dataVerification.validData.postalCode,
    );
    await checkoutPage.finishOrder();
    await expect(checkoutPage.page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.homeButton).toBeVisible();
    await checkoutPage.homeButton.click();
    await expect(checkoutPage.page).toHaveURL(/inventory/);
  });
});
