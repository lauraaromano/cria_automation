import { Page, expect } from "@playwright/test"

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

    async saveThemeAndGenre() {
        this.tema = (await this.page.locator('p:text-is("TEMA") + p').first().textContent() ?? '').trim();

        this.genero = (
            await this.page.locator('p:text-is("TIPO / GÊNERO") + p').first().textContent() ?? ''
        ).trim();

        if (!this.tema || !this.genero) {
            throw new Error(
                `Não foi possível capturar tema e gênero. ` +
                `Tema: "${this.tema}" | ` +
                `Gênero: "${this.genero}"`,
            );
        }

        console.log('Tema salvo:', this.tema);
        console.log('Gênero salvo:', this.genero);
    }


    async verifyThemeAndGenre() {
        const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

        const temaEsperado = normalize(this.tema);

        const generoEsperado = normalize(
            this.genero
                .split(' - ')
                .pop()
                ?.trim() ?? this.genero,
        );

        const generoEsperadoSemComplemento = generoEsperado
            .replace(/\([^)]*\)/g, '')
            .trim();

        const linhas = this.page.locator('[role="row"]');
        const quantidadeLinhas = await linhas.count();

        for (let index = 1; index < quantidadeLinhas; index++) {
            const linha = linhas.nth(index);
            const celulas = linha.locator('[role="cell"]');

            if (await celulas.count() < 3) {
                continue;
            }

            const temaNaTabela = normalize(
                await celulas.nth(1).innerText().catch(() => ''),
            );

            const generoNaTabela = normalize(
                await celulas.nth(2).innerText().catch(() => ''),
            );

            const generoVisivel = generoNaTabela
                .replace(/\.\.\./g, '')
                .trim();

            const temaEncontrado =
                temaNaTabela === temaEsperado;

            const generoEncontrado =
                generoVisivel.startsWith(
                    generoEsperadoSemComplemento,
                ) ||
                generoEsperadoSemComplemento.startsWith(
                    generoVisivel,
                );

            console.log(`Linha ${index}:`);


            if (temaEncontrado && generoEncontrado) {
                console.log(
                    '[verifyThemeAndGenre] Tema e gênero conferem.',
                );

                return;
            }
        }

        throw new Error(
            `[verifyThemeAndGenre] Rascunho não encontrado.\n` +
            `Tema esperado: "${this.tema}"\n` +
            `Gênero esperado: "${this.genero}"`,
        );
    }

    async deleteDraft() {
        const linha = this.page
            .locator('div[role="row"]')
            .filter({ hasText: this.tema })
            .last();

        await expect(linha).toBeVisible({
            timeout: 10_000,
        });

        await linha
            .locator('div[data-field="id"]')
            .locator('svg, img')
            .first()
            .click();

        await this.page
            .getByRole('button', {
                name: 'Excluir',
                exact: true,
            })
            .click();
    }



    async openDraft() {
        const generoParcial = this.genero.split(' - ').pop()?.trim() ?? this.genero

        const linha = this.page
            .locator('div[role="row"]')
            .filter({ has: this.page.getByRole('button', { name: this.tema }) })
            .filter({ has: this.page.locator('div[data-field="genero"]', { hasText: generoParcial }) })

        await expect(linha).toBeVisible({ timeout: 10_000 })

        const openIcon = linha.locator('div[data-field="professorCorrigiu"] svg')
        await openIcon.click()
    }

    async validateNumberOfDrafts(): Promise<number> {
        const numeroDeRascunhos = await this.page
            .getByText('Rascunhos', { exact: true })
            .locator('..')
            .locator('p')
            .nth(1)
            .innerText();

        return Number(numeroDeRascunhos.trim());
    }

    async validateDraftWasAdded(numeroAnterior: number) {
        const numeroAtual = await this.validateNumberOfDrafts();

        await expect(numeroAtual).toBe(numeroAnterior + 1);

    } 

    // async validateDraftWasRemoved(numeroAnterior: number) {
    //     const numeroAtual = await this.validateNumberOfDrafts();

    //     await expect(numeroAtual).toBe(numeroAnterior - 1);
    // } 
}