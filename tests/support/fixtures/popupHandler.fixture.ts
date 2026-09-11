// tests/support/fixtures/popupHandler.fixture.ts
import { test as base, expect } from '@playwright/test';

export const test = base.extend({

  page: async ({ page }, use) => {
    page.on('load', () => {
      console.log('>>> PÁGINA RECARREGOU - URL:', page.url());
    });

    const acceptAllButton = page.getByRole('button', { name: /Aceitar todos/i });
    await page.addLocatorHandler(acceptAllButton, async () => {
      await acceptAllButton.click();
      await page.waitForLoadState('networkidle').catch(() => {});
    });

    const useLaterButton = page.getByRole('button', { name: /Usar depois/i });
    await page.addLocatorHandler(useLaterButton, async () => {
      await useLaterButton.click();
      await expect(useLaterButton).toBeHidden({ timeout: 5000 }).catch(() => {});
    });

    await use(page);
  },
});

export { expect };