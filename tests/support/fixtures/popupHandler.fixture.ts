import { test as base, expect, type Page, type Locator } from '@playwright/test';

type PopupRule = {
  name: string;
  locator: (page: Page) => Locator;
};

export const POPUP_RULES: PopupRule[] = [
  {
    name: 'Cookies - Aceitar todos',
    locator: (page) => page.getByRole('button', { name: /aceitar todos/i }),
  },
  {
    name: 'Usar depois',
    locator: (page) => page.getByRole('button', { name: /usar depois/i }),
  },
];

export const test = base.extend<{ popupHandler: void }>({
  page: async ({ page }, use) => {
    page.on('load', () => console.log('>>> PÁGINA CARREGOU:', page.url()));
    page.on('dialog', async (dialog) => {
      console.log(`[popupHandler] dialog nativo: ${dialog.message()}`);
      await dialog.accept().catch(() => {});
    });
    await use(page);
  },

  popupHandler: [
    async ({ page }, use) => {
      for (const rule of POPUP_RULES) {
        const locator = rule.locator(page).first();
        await page.addLocatorHandler(
          locator,
          async () => {
            await locator.click({ timeout: 3000, noWaitAfter: true }).catch(() => {});
            console.log(`[popupHandler] fechado: ${rule.name}`);
          },
          { noWaitAfter: true },
        );
      }
      await use();
    },
    { auto: true },
  ],
});

export { expect };