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
        recoveryButtonName,
    } = options;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(
            `[retryOnReload] "${label}": iniciando tentativa ` +
            `${attempt}/${maxRetries}`,
        );

        try {
            if (attempt > 1) {
                await page
                    .waitForLoadState('domcontentloaded')
                    .catch(() => {});

                await page.waitForTimeout(1000).catch(() => {});

                if (recoveryButtonName) {
                    const recoveryElement = page
                        .getByRole('button', {
                            name: new RegExp(
                                recoveryButtonName,
                                'i',
                            ),
                        })
                        .or(
                            page.getByRole('tab', {
                                name: new RegExp(
                                    recoveryButtonName,
                                    'i',
                                ),
                            }),
                        )
                        .or(
                            page.getByText(recoveryButtonName, {
                                exact: true,
                            }),
                        )
                        .first();

                    const visible = await recoveryElement
                        .isVisible({ timeout: 2000 })
                        .catch(() => false);

                    if (visible) {
                        await recoveryElement.click();

                        await page
                            .waitForTimeout(500)
                            .catch(() => {});
                    }
                }
            }

            return await fn();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : String(error);

            console.warn(
                `[retryOnReload] "${label}": erro na tentativa ` +
                `${attempt}: ${message}`,
            );

            if (attempt === maxRetries) {
                console.error(
                    `[retryOnReload] "${label}": esgotou ` +
                    `${maxRetries} tentativas.`,
                );

                throw error;
            }

            await page
                .waitForLoadState('domcontentloaded')
                .catch(() => {});

            await page
                .waitForTimeout(1000)
                .catch(() => {});
        }
    }

    throw new Error(
        `[retryOnReload] "${label}": fluxo terminou inesperadamente.`,
    );
}
