import {
  test as base,
  expect,
  type Page,
  type Locator,
} from '@playwright/test';

type PopupRule = {
  name: string;
  locator: (page: Page) => Locator;
};

export const POPUP_RULES: PopupRule[] = [
  {
    name: 'Cookies - Aceitar todos',
    locator: (page) =>
      page.getByRole('button', { name: /aceitar todos/i }),
  },
  {
    name: 'Usar depois',
    locator: (page) =>
      page.getByRole('button', { name: /usar depois/i }),
  },
];

const WATCHER_INTERVAL_MS = 500;

async function dismiss(locator: Locator, name: string): Promise<void> {
  try {
    await locator.click({
      timeout: 3000,
      noWaitAfter: true,
    });

    console.log(`[popupHandler] fechado: ${name}`);
  } catch {
    // O popup pode ter desaparecido ou já ter sido fechado.
  }
}

export const test = base.extend<{
  popupHandler: void;
}>({
  page: async ({ page }, use) => {
    page.on('load', () => {
      console.log(`[popupHandler] página carregou: ${page.url()}`);
    });

    page.on('dialog', async (dialog) => {
      console.log(
        `[popupHandler] dialog nativo: ${dialog.message()}`,
      );

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
            await dismiss(locator, rule.name);
          },
          {
            noWaitAfter: true,
          },
        );
      }

      let active = true;

      const watcher = (async () => {
        while (active && !page.isClosed()) {
          for (const rule of POPUP_RULES) {
            if (!active || page.isClosed()) {
              break;
            }

            const locator = rule.locator(page).first();

            const visible = await locator
              .isVisible({ timeout: 400 })
              .catch(() => false);

            if (visible) {
              await dismiss(locator, rule.name);
            }
          }

          await page
            .waitForTimeout(WATCHER_INTERVAL_MS)
            .catch(() => {});
        }
      })();

      await use();

      active = false;
      await watcher.catch(() => {});
    },
    {
      auto: true,
    },
  ],
});

export { expect };
