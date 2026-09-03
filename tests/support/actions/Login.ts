import { Page, expect } from "@playwright/test"
import users from '../fixtures/data/users.json';

export class Login {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async login(email: string, password: string) {
        await this.page.goto('/')
        await this.page.locator('#email').fill(email)
        await this.page.locator('#password').fill(password)
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.page.getByRole('button', { name: 'Entrar' }).click(),
        ]);
    }

     async IsLoggedIn(){
        await expect(this.page.getByText(users.valid.name)).toBeVisible({ timeout: 10000 });
    }

    async Logout() {
        await this.page.locator('#react-burger-menu-btn').click();
        await this.page.locator('nav').getByTestId('logout-sidebar-link').click();
        await expect(this.page).toHaveURL('/');
    }
}