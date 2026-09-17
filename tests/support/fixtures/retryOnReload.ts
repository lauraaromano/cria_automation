import { Page } from '@playwright/test';

type RetryOptions = {
  maxRetries?: number;
  label?: string;
};

export async function retryOnReload<T>(
  page: Page,
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxRetries = 3, label = 'fluxo' } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    let reloadDetected = false;

    const reloadPromise = new Promise<never>((_, reject) => {
      page.once('load', () => {
        reloadDetected = true;
        reject(new Error(`[retryOnReload] página recarregou durante "${label}"`));
      });
    });

    const fnPromise = fn().catch((e) => { throw e; });
    // "abafa" a rejeição da fnPromise perdedora, sem recriar a execução
    fnPromise.catch(() => {});

    try {
      const result = await Promise.race([fnPromise, reloadPromise]);
      return result as T;
    } catch (err) {
      if (attempt === maxRetries) {
        console.log(
          `[retryOnReload] "${label}": esgotou ${maxRetries} tentativas. Último erro: ${(err as Error).message}`,
        );
        throw err;
      }

      console.log(
        `[retryOnReload] "${label}": falhou na tentativa ${attempt}` +
        `${reloadDetected ? ' (reload detectado no meio do fluxo)' : ''}. Tentando novamente...`,
      );

      await page.waitForLoadState('domcontentloaded').catch(() => {});
      await page.waitForTimeout(1000).catch(() => {});
    }
  }

  throw new Error('unreachable');
}