import { Page } from '@playwright/test';

type RetryOptions = {
  maxRetries?: number;
  label?: string;
  /** Texto do botão que, se visível, indica que voltamos pro início do fluxo
   * (ex: reload jogou a página de volta pra tela anterior a "Criar redação").
   * Se visível antes de uma nova tentativa, é clicado automaticamente. */
  recoveryButtonName?: string;
};

export async function retryOnReload<T>(
  page: Page,
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxRetries = 3, label = 'fluxo', recoveryButtonName = 'Criar redação' } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    let reloadDetected = false;

    // Antes de qualquer tentativa além da primeira, verifica se a página
    // voltou pro estado inicial do fluxo (reload jogou pra trás demais).
    // Se sim, refaz o clique que normalmente só acontece no beforeEach.
    if (attempt > 1) {
      const recoveryButton = page.getByRole('button', { name: recoveryButtonName });
      const precisaRecuperar = await recoveryButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (precisaRecuperar) {
        console.log(`[retryOnReload] "${label}": página voltou ao início, clicando em "${recoveryButtonName}" de novo...`);
        await recoveryButton.click().catch(() => {});
      }
    }

    const reloadPromise = new Promise<never>((_, reject) => {
      page.once('load', () => {
        reloadDetected = true;
        reject(new Error(`[retryOnReload] página recarregou durante "${label}"`));
      });
    });

    const fnPromise = fn();
    // Evita "unhandled rejection" da execução perdedora sem recriar nada
    fnPromise.catch(() => {});

    try {
      const result = await Promise.race([fnPromise, reloadPromise]);
      return result as T;
    } catch (err) {
      // CRÍTICO: espera a execução antiga (fnPromise) terminar de verdade
      // antes de seguir pra próxima tentativa, mesmo que ela vá dar erro.
      // Evita ter duas execuções do fluxo rodando ao mesmo tempo na mesma página
      // (causa do erro "Target page, context or browser has been closed").
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