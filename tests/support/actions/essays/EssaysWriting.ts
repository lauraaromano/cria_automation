import { Page, expect } from "@playwright/test"
import { essays } from "../../fixtures";

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

    async AiValidationButton(){
        await this.page
            .getByRole('button', { name: 'Avaliar redação com IA  ' })
            .click()
    }

    async digitizeEssay(imagePath: string) {
        await this.page.getByRole('button', { name: 'Digitalizar redação' }).click();

        const fileInput = this.page.locator('#inputFile');
        await fileInput.setInputFiles(imagePath);
        await this.page.getByRole('button', { name: 'Upload redação' }).click();
        
    }
    async extractEssay() {
        await this.page.getByRole('button', { name: 'Extrair redação' }).click(); 
    }

}