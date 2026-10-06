import { Page, expect } from "@playwright/test"

export const ErrorHandler = {
    async expectFieldError(page: Page, fieldLabel: string, message: string) {
        const fieldContainer = page
            .getByText(fieldLabel, { exact: true })
            .locator('xpath=ancestor::div[contains(@class, "MuiFormControl-root")][1]');

        await expect(
            fieldContainer.locator('.MuiFormHelperText-root.Mui-error')
        ).toHaveText(message);
    },
};