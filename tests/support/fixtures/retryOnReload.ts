// tests/e2e/support/fixtures/retryOnReload.ts
import { Page } from '@playwright/test';

type RetryOptions = {
  maxRetries?: number;
  label?: string;
  recoveryButtonName?: string;
};

export async function retryOnReload<T>(
  page: Page,
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxRetries = 3, label = 'fluxo', recoveryButtonName = 'Criar redação' } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {

    const jaConcluiu = await page
      .getByRole('textbox', { name: 'Digite o título aqui' })
      .isVisible({ timeout: 1500 })
      .catch(() => false);

    if (jaConcluiu) {
      console.log(`[retryOnReload] "${label}": já está na tela de escrita da redação, fluxo concluído.`);
      return undefined as T;
    }

    if (attempt > 1) {
      const recoveryButton = page.getByRole('button', { name: recoveryButtonName });
      const precisaRecuperar = await recoveryButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (precisaRecuperar) {
        console.log(`[retryOnReload] "${label}": página voltou ao início, clicando em "${recoveryButtonName}" de novo...`);
        await recoveryButton.click().catch(() => {});
      }
    }

    let reloadDetected = false;
    let fnSettled = false;

    const fnPromise = fn().finally(() => { fnSettled = true; });
    fnPromise.catch(() => {});

    const reloadPromise = new Promise<never>((_, reject) => {
      const handler = () => {
        // Ignora o reload SOMENTE se fn() já tiver terminado (sucesso real).
        // Não compara mais URL — comparar URL causava falso negativo quando
        // o reload levava a uma URL ligeiramente diferente da inicial,
        // fazendo o retry nunca perceber o problema.
        if (fnSettled) return;

        reloadDetected = true;
        page.off('load', handler);
        reject(new Error(`[retryOnReload] página recarregou durante "${label}" (URL atual: ${page.url()})`));
      };
      page.on('load', handler);
      fnPromise.finally(() => page.off('load', handler));
    });

    try {
      const result = await Promise.race([fnPromise, reloadPromise]);
      return result as T;
    } catch (err) {
      await fnPromise.catch(() => {});

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