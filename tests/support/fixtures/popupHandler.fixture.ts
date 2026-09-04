import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Popup de cookies
    const acceptAllButton = page.getByRole('button', { name: /Aceitar todos/i });
    await page.addLocatorHandler(acceptAllButton, async () => {
      await acceptAllButton.click();
    });

    // Popup de moedas que vão expirar
    const useLaterButton = page.getByRole('button', { name: /Usar depois/i });
    await page.addLocatorHandler(useLaterButton, async () => {
      await useLaterButton.click();
    });

    await use(page);
  },
});

export { expect };