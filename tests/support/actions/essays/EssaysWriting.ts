import { Page, expect } from "@playwright/test"

async function skipIfAlreadyDone(page: Page, doneMarkerText: string, exact = true): Promise<boolean> {
    return await page.getByText(doneMarkerText, { exact }).isVisible({ timeout: 1000 }).catch(() => false);
}

export class EssaysWriting {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async essayTitle(titulo: string) {
        await this.page.locator('#tituloRedacao').fill(titulo);
    }

    async essayTextArea(essay: string) {
        await this.page.locator('#textArea').fill(essay)

    }

    async aiValidationButton(){
        await this.page
            .getByRole('button', { name: 'Avaliar redação com IA  ' })
            .click()
    }

    async backToTheMainScreen(){
        await this.page.getByRole('button', { name: '   Voltar para a tela principal' }).click(); 
    }

    async sureToGoBack(){
        await this.page.getByRole('button', { name: 'Voltar para a página principal ' }).click(); 

    }

}