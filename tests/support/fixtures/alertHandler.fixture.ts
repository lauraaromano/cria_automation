import { expect, type Page } from '@playwright/test';

export const AlertHandler = {
  async expectAlertMessage( page: Page, message: string, ): Promise<void> {
    const toast = page.locator('.Toastify__toast').filter({ hasText: message }).last();

    await expect(toast).toBeVisible({timeout: 10_000,});

    await expect(toast.locator('.Toastify__toast-body')).toContainText(message,
      {
        timeout: 10_000,
      },
    );
  },
};
