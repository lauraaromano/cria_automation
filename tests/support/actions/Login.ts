import { Page, expect } from "@playwright/test"
import { users } from '../fixtures';

export class Login {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async login(email: string, password: string) {
        await this.page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60_000 })

        await this.page.locator('#email').fill(email)
        await this.page.locator('#password').fill(password)

        await this.page.getByRole('button', { name: 'Entrar' }).click()

    }

    async IsLoggedIn() {
        const header = this.page.getByRole('banner');

        await expect(
            header.getByText(users.valid.name, { exact: true })
        ).toBeVisible({ timeout: 10_000 });
    }

    async Logout() {
        const header = this.page.getByRole('banner');

        const userMenuButton = header
            .locator('button.MuiIconButton-root.MuiIconButton-sizeMedium')
            .last();

        await userMenuButton.click();
        await this.page.locator('li[role="menuitem"][tipo="sair"]').click();
        await expect(this.page).toHaveURL('/');
    }


}