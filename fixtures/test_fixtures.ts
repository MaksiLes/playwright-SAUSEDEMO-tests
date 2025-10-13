import { test as base } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { user } from '../utils/test_data';

export const test = base.extend<{ authPage: AuthPage }>({
  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login(user.validUser.username, user.validUser.password);
    await authPage.waitForUrl();
    await use(authPage);
  },
});
export const expect = base.expect;
