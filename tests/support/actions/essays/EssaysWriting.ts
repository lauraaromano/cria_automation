import { Page, expect } from "@playwright/test"
import { essays } from "../../fixtures";

async function skipIfAlreadyDone(page: Page, doneMarkerText: string, exact = true): Promise<boolean> {
    return await page.getByText(doneMarkerText, { exact }).isVisible({ timeout: 1000 }).catch(() => false);
}

export class EssaysWriting  {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickCreateEssay() {
        await this.page
            .getByRole('button', { name: 'Criar redação' })
            .click();
    }

    async clickStartNewEssay() {
        await this.page
            .getByRole('button', { name: 'Começar nova redação' })
            .click();
    }

}