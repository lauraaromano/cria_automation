import { Page, expect } from "@playwright/test"

export const ErrorHandler = {
    async expectFieldError(page: Page, fieldLabel: string, message: string) {
        await expect(
            page
                .locator('.MuiFormControl-root')
                .filter({ has: page.getByLabel(fieldLabel) })
                .locator('.MuiFormHelperText-root.Mui-error')
        ).toHaveText(message);
    },
};