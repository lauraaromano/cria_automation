import { test as popupHandlerTest } from './popupHandler.fixture';
import { retryOnReload } from './retryOnReload';

type BaseTest = typeof popupHandlerTest;

function wrapWithRetry(originalTest: BaseTest): BaseTest {
  const wrapped = ((name: string, fn: (args: any) => Promise<void>) => {
    // O parâmetro PRECISA estar desestruturado assim, literalmente no código-fonte,
    // porque o Playwright lê o texto da função pra saber quais fixtures injetar.
    return originalTest(name, async ({ page }, testInfo) => {
      await retryOnReload(page, () => fn({ page, ...({} as any) }), { label: name });
    });
  }) as unknown as BaseTest;

  return Object.assign(wrapped, originalTest);
}

export const test = wrapWithRetry(popupHandlerTest);
export { expect } from '@playwright/test';