import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    const acceptAllButton = page.getByRole('button', { name: /Aceitar todos/i });

    await page.addLocatorHandler(acceptAllButton, async () => {
      await acceptAllButton.click();
    });

    await use(page);
  },
});

export { expect };