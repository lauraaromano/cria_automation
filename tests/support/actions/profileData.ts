import { Page, expect } from "@playwright/test"
import { users } from '../fixtures';

export class ProfileData {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async myData() {
        
        const header = this.page.getByRole('banner');

        const userMenuButton = header
            .locator('button.MuiIconButton-root.MuiIconButton-sizeMedium')
            .last();

        await userMenuButton.click();
        await this.page.locator('li[role="menuitem"][tipo="normal"]').click();
        await expect(this.page).toHaveURL('/editar-perfil');

    }

    async editMyData(dados: string) {
        await this.page
            .getByText(dados)
            .locator('..')
            .getByTestId('ArrowForwardIosIcon')
            .click()
    }

    async saveChanges() {
        await this.page.getByRole("button", {name:"Salvar Alterações "}).click()
    }

    async editName(campo: string) {
        await this.page.locator('#nomeAluno').fill(campo)
    }

    async editStateAndCity(estado: string, cidade: string) {

        const estadoSelect = this.page
            .getByText('Estado')
            .locator('..')
            .getByRole('combobox')

        await estadoSelect.click()
        await this.page.getByRole('option', { name: estado }).click()

        const ciadadeSelect = this.page
            .getByText('Cidade')
            .locator('..')
            .getByRole('combobox')

        await ciadadeSelect.click()
        await this.page.getByRole('option', { name: cidade }).click()

    }

    async editDateOfBirth(data: string) {
        this.page.locator('input[name="dataNascimento"]').fill(data)
    }

    async editPhoneNumber(phone: string) {
        await this.page
            .locator('input[name="telefoneAluno"]')
            .fill(phone)
    }

    async editDesiredCourse(course: string) {
        await this.page
            .locator('input[name="cursoAlmejado"]')
            .fill(course)

    }

}