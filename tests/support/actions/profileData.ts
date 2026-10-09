import { Page } from "@playwright/test"

export class ProfileData {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async myData() {
        await this.page.goto('/editar-perfil', {
            waitUntil: 'domcontentloaded',
        });
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

        const estadoOption = this.page.getByRole('option', {
            name: estado,
            exact: true,
        });

        await estadoOption.waitFor({
            state: 'visible',
            timeout: 5000,
        });

        await estadoOption.click();

        const cidadeSelect = this.page
            .getByText('Cidade')
            .locator('..')
            .getByRole('combobox');

        await cidadeSelect.click();

        const cidadeOption = this.page.getByRole('option', {
            name: cidade,
            exact: true,
        });

        await cidadeOption.waitFor({
            state: 'visible',
            timeout: 5000,
        });

        await cidadeOption.click();
    }


    async editDateOfBirth(data: string) {
        await this.page.locator('input[name="dataNascimento"]').fill(data)
    }

    async editPhoneNumber(phone: string) {
        await this.page
            .locator('input[name="telefoneAluno"]')
            .fill(phone)
    }

    async editDesiredCourse(oldCourse: string, course: string) {
        await this.page.getByText(oldCourse).click();
        await this.page.getByRole('option', { name: course}).click();
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