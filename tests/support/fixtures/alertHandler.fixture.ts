import { Page, expect } from "@playwright/test"

export const AlertHandler = {
    async expectAlertMessage(page: Page, message: string) {
        await expect(page.locator('.Toastify__toast-body')).toHaveText(message);
    }

};