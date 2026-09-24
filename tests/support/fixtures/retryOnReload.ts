import type { Page } from '@playwright/test';

export type RetryOptions = {
  maxRetries?: number;
  label?: string;
  recoveryButtonName?: string;
};

export async function retryOnReload<T>(
  page: Page,
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = 3,
    label = 'fluxo',
    recoveryButtonName = 'Criar redação',
  } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(
      `[retryOnReload] "${label}": iniciando tentativa ` +
        `${attempt}/${maxRetries}`,
    );

    if (attempt > 1) {
      await page
        .waitForLoadState('domcontentloaded')
        .catch(() => {});

      await page.waitForTimeout(1000).catch(() => {});

      const recoveryButton = page.getByRole('button', {
        name: recoveryButtonName,
      });

      const precisaRecuperar = await recoveryButton
        .isVisible({ timeout: 2000 })
        .catch(() => false);

      if (precisaRecuperar) {
        console.log(
          `[retryOnReload] "${label}": clicando novamente em ` +
            `"${recoveryButtonName}"`,
        );

        await recoveryButton.click();
      }
    }

    let reloadDetected = false;
    let fnFinished = false;

    let rejectReload!: (error: Error) => void;

    const reloadPromise = new Promise<never>((_, reject) => {
      rejectReload = reject;
    });

    const loadHandler = () => {
      if (fnFinished) {
        return;
      }

      reloadDetected = true;

      const error = new Error(
        `[retryOnReload] página recarregou durante "${label}" ` +
          `(URL atual: ${page.url()})`,
      );

      rejectReload(error);
    };

    // O listener precisa ser criado ANTES da execução da função.
    page.on('load', loadHandler);

    const fnPromise = fn().finally(() => {
      fnFinished = true;
      page.off('load', loadHandler);
    });

    // Evita rejeição não tratada da Promise original.
    fnPromise.catch(() => {});

    try {
      const result = await Promise.race([
        fnPromise,
        reloadPromise,
      ]);

      page.off('load', loadHandler);

      return result;
    } catch (error) {
      page.off('load', loadHandler);

      // Aguarda a função original terminar, mesmo que o reload
      // tenha vencido a corrida.
      await fnPromise.catch(() => {});

      const message =
        error instanceof Error
          ? error.message
          : String(error);

      if (attempt === maxRetries) {
        console.error(
          `[retryOnReload] "${label}": esgotou as ` +
            `${maxRetries} tentativas.`,
        );

        throw error;
      }

      console.log(
        `[retryOnReload] "${label}": erro na tentativa ` +
          `${attempt}: ${message}`,
      );

      if (reloadDetected) {
        console.log(
          `[retryOnReload] "${label}": reload detectado. ` +
            'O fluxo será executado novamente.',
        );
      }

      await page
        .waitForLoadState('domcontentloaded')
        .catch(() => {});

      await page.waitForTimeout(1000).catch(() => {});
    }
  }

  throw new Error(
    `[retryOnReload] "${label}": fluxo terminou inesperadamente.`,
  );
}
