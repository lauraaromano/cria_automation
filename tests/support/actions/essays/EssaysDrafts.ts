import { Page, expect } from "@playwright/test"
import { essays } from "../../fixtures";

export class EssayDrafts {
    page: Page
    tema: string = ''
    genero: string = ''


    constructor(page: Page) {
        this.page = page
    }

    async draftSave() {
        await this.page.getByRole('button', { name: 'Salvar Rascunho   ' }).click()
    }

    async openDraftsTab() {
        await this.page.getByRole('button', { name: 'RASCUNHOS', exact: true }).click()
    }

    async guardarTemaEGenero() {
        this.tema = await this.page.locator('p:text-is("TEMA") + p').textContent() ?? ''
        this.genero = await this.page.locator('p:text-is("TIPO / GÊNERO") + p').textContent() ?? ''

        console.log('Tema:', this.tema)
        console.log('Gênero:', this.genero)
    }

    async verificarTemaEGenero() {
        const generoParcial = this.genero.split(' - ').pop()?.trim() ?? this.genero
        const nextButton = this.page.getByRole('button', { name: 'Go to next page' }).first()

        const linha = this.page
            .locator('div[role="row"]')
            .filter({ has: this.page.getByRole('button', { name: this.tema }) })
            .filter({ has: this.page.locator('div[data-field="genero"]', { hasText: generoParcial }) })

        while (true) {
            if (await linha.isVisible().catch(() => false)) {
                await expect(linha).toBeVisible()
                return
            }

            const temProximaPagina = await nextButton.isEnabled().catch(() => false)
            if (!temProximaPagina) {
                throw new Error(`[verificarTemaEGenero] Não encontrado. Tema: "${this.tema}" | Gênero: "${generoParcial}"`)
            }

            await nextButton.click()
            await this.page.waitForLoadState('domcontentloaded')
        }
    }
    async deleteDraft() {
        const generoParcial = this.genero.split(' - ').pop()?.trim() ?? this.genero

        const linha = this.page
            .locator('div[role="row"]')
            .filter({ has: this.page.getByRole('button', { name: this.tema }) })
            .filter({ has: this.page.locator('div[data-field="genero"]', { hasText: generoParcial }) })

        await expect(linha).toBeVisible({ timeout: 10_000 })

        await linha.locator('img').last().click()
    }
}