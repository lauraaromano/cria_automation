// tests/support/fixtures/popupHandler.fixture.ts
import { test as base, expect } from '@playwright/test';

export const test = base.extend({

  page: async ({ page }, use) => {
    page.on('load', () => {
      console.log('>>> PÁGINA RECARREGOU - URL:', page.url());
    });

    // Popup de cookies
    const acceptAllButton = page.getByRole('button', { name: /Aceitar todos/i });
    await page.addLocatorHandler(acceptAllButton, async () => {
      console.log('Handler "Aceitar todos" disparado - URL antes:', page.url());
      await acceptAllButton.click();
      await page.waitForLoadState('networkidle').catch(() => {});
      console.log('URL depois de aceitar cookies:', page.url());
    });

    // Popup de moedas que vão expirar
    const useLaterButton = page.getByRole('button', { name: /Usar depois/i });
    await page.addLocatorHandler(useLaterButton, async () => {
      console.log('Handler "Usar depois" disparado - URL antes:', page.url());
      await useLaterButton.click();
      console.log('URL depois do clique:', page.url());
      await expect(useLaterButton).toBeHidden({ timeout: 5000 }).catch(() => {
        console.log('Botão "Usar depois" NÃO sumiu depois de 5s - possível re-disparo do handler');
      });
    });

    await use(page);
  },
});

export { expect };