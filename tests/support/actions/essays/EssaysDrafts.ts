import { Page, expect } from "@playwright/test"
import { essays } from "../../fixtures";

async function skipIfAlreadyDone(page: Page, doneMarkerText: string, exact = true): Promise<boolean> {
    return await page.getByText(doneMarkerText, { exact }).isVisible({ timeout: 1000 }).catch(() => false);
}

export class EssayDrafts {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async draftSave() {
        await this.page.getByRole('button', { name: 'Salvar Rascunho   ' }).click()
    }

}