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

    async IsLoggedIn(){
        await expect(this.page.getByText(users.valid.name)).toBeVisible({ timeout: 10_000 });
    }

    async Logout() {
        await this.page.locator('button[aria-haspopup="true"]').click();
        await this.page.getByRole('menuitem', { name: 'Sair' }).click();
        await expect(this.page).toHaveURL('/');
    }
}