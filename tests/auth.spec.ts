import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { user } from '../utils/test-data';

test.describe('Login tests', () => {
  let authPage: AuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.goto();
  });

  test('Positive test', async () => {
    await authPage.login(user.validUser.username, user.validUser.password);
    await authPage.waitForUrl();
    await expect(authPage.page).toHaveURL(/inventory\.html/);
  });

  test('Negative test - invalid user', async () => {
    await authPage.login(user.invalidUser.username, user.invalidUser.password);
    await expect(authPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('Negative test - locked out user', async () => {
    await authPage.login(user.lockedOutUser.username, user.lockedOutUser.password);
    await expect(authPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });
});
