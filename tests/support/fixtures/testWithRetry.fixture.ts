import { test as popupHandlerTest } from './popupHandler.fixture';
import { retryOnReload } from './retryOnReload';

type BaseTest = typeof popupHandlerTest;

function wrapWithRetry(originalTest: BaseTest): BaseTest {
  const wrapped = ((name: string, fn: (args: any) => Promise<void>) => {
    return originalTest(name, async ({ page }, testInfo) => {
      await retryOnReload(
        page,
        () => fn({ page, ...({} as any) }),
        { label: name, maxRetries: 10 },
      );
    });
  }) as unknown as BaseTest;

  return Object.assign(wrapped, originalTest);
}

export const test = wrapWithRetry(popupHandlerTest);
export { expect } from '@playwright/test';