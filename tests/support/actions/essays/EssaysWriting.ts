import { Page, expect } from "@playwright/test"
import { AlertHandler } from "../../fixtures/alertHandler.fixture"
import { EssayDrafts } from "./EssaysDrafts"

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

    async essayWriting(titulo: string, texto: string, essayDraft: EssayDrafts) {
        await this.essayTitle(titulo);
        await this.essayTextArea(texto);
        await essayDraft.saveThemeAndGenre();
        await essayDraft.draftSave();
        await AlertHandler.expectAlertMessage(this.page, 'Redação salva com sucesso');
    }

    async essayWritingAndValidateWithAI(
        titulo: string,
        texto: string,
        essayInformation: {
            tipo: string
            genero: string
            tema: string
        }
    ) {
        await this.essayTitle(titulo)
        await this.essayTextArea(texto)

        const typeAndGenre = `${essayInformation.tipo} - ${essayInformation.genero}`

        await expect(
            this.page.getByText(typeAndGenre, { exact: true })
        ).toBeVisible({
            timeout: 20_000
        })

        await expect(
            this.page.getByText(essayInformation.tema, { exact: true })
        ).toBeVisible({
            timeout: 20_000
        })

        await this.aiValidationButton()
    }



    async backToMain() {
        await this.backToTheMainScreen();
        await this.sureToGoBack();
    }
}