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
            .getByRole('combobox');

        await estadoSelect.click();

        const estadoOption = this.page.getByRole('option', { name: estado, exact: true });
        await estadoOption.waitFor({ state: 'visible', timeout: 5000 });
        await estadoOption.click();

        const cidadeSelect = this.page
            .getByText('Cidade')
            .locator('..')
            .getByRole('combobox');

        await cidadeSelect.click();

        const cidadeOption = this.page.getByRole('option', { name: cidade, exact: true });
        await cidadeOption.waitFor({ state: 'visible', timeout: 5000 });
        await cidadeOption.click();
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

    async editMainGoal(goal: string) {
        const goalCombobox = this.page
            .locator('form')
            .getByRole('combobox')
            .nth(2);

        await goalCombobox.click();

        await this.page.getByRole('option', {
            name: goal,
            exact: true,
        }).click();
    }


    async editPassword(password: string) {
        await this.page 
            .locator('#senhaAtual')
            .fill(password)
    }

    async editNewPassword(newpassword: string) {
        await this.page 
            .locator('#novaSenha')
            .fill(newpassword)
    }

    async editConfirmPassword(confirmpassword: string) {
        await this.page 
            .locator('#confirmeSenha')
            .fill(confirmpassword)
    }
    
    async saveInfo() {
        await this.page.getByRole("button", {name:" Salvar Informações "}).click()
    }

}