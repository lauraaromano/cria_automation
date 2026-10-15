import { Page, expect } from "@playwright/test"

export class EssayCorrection {
    page: Page
    tema: string = ''
    genero: string = ''

    constructor(page: Page) {
        this.page = page
    }
    
    private async clickIfVisible(name: string | RegExp, timeout = 3000): Promise<boolean> {
        const button = this.page.getByRole('button', { name });
        const isVisible = await button.isVisible({ timeout }).catch(() => false);
        if (isVisible) {
            await button.click();
            console.log(`[EssayCorrection] clicou em: "${name}"`);
            return true;
        }
        return false;
    }

    async perfectScore(): Promise<boolean> {
        return this.clickIfVisible('Quero deixar nota mil   ');
    }

    async withoutDetailedCorrection() {
        const button = this.page.getByRole('button', {
            name: /sem correção detalhada|não quero correção detalhada/i,
        });

        const isVisible = await button
            .isVisible({ timeout: 1000 })
            .catch(() => false);

        if (!isVisible) {
            return false;
        }
        await button.click();
        return true;
    }

    async editGrade() {
        const button = this.page.getByRole('button', {
            name: /editar nota|alterar nota/i,
        });

        const isVisible = await button
            .isVisible({ timeout: 1000 })
            .catch(() => false);

        if (!isVisible) {
            return false;
        }

        await button.click();

        return true;
    }


    async goBack() {
        const button = this.page.getByRole('button', {
            name: 'Voltar para tela inicial',
        });

        const isVisible = await button
            .isVisible({ timeout: 1000 })
            .catch(() => false);

        if (!isVisible) {
            return false;
        }

        await button.click();

        return true;
    }

    async essayBoard() {
        const button = this.page.getByRole('button', {
            name: /painel de redações/i,
        });

        const isVisible = await button
            .isVisible({ timeout: 1000 })
            .catch(() => false);

        if (!isVisible) {
            return false;
        }

        await button.click();

        return true;
    }

    async closeMidia() {
        const closeButton = this.page.getByTestId('CloseIcon');

        const isVisible = await closeButton
            .isVisible({ timeout: 1000 })
            .catch(() => false);

        if (!isVisible) {
            return false;
        }

        await closeButton.click();

        return true;
    }
    async correctionBtn(button: string){
        await this.page.getByRole('button', { name: button, exact: true }).click()
    }

    async essaysBoard(){
        await this.page.getByRole('button', { name: 'Painel de redações ', exact: true }).click()

    }

    async correctedEssay(){
        await expect(this.page.getByText('Redação Corrigida IA', { exact: true }));
    }

    async getEssayInformation() {
        const typeAndGenreLocator = this.page
            .getByText('TIPO / GÊNERO', { exact: true })
            .locator('xpath=following-sibling::p[1]')

        const themeLocator = this.page
            .getByText('TEMA', { exact: true })
            .locator('xpath=following-sibling::p[1]')

        await expect(typeAndGenreLocator).toBeVisible({
            timeout: 20_000
        })

        await expect(themeLocator).toBeVisible({
            timeout: 20_000
        })

        const typeAndGenre = (
            await typeAndGenreLocator.innerText()
        ).trim()

        const tema = (
            await themeLocator.innerText()
        ).trim()

        const separator = ' - '
        const separatorIndex = typeAndGenre.indexOf(separator)

        if (separatorIndex === -1) {
            throw new Error(
                `Não foi possível separar tipo e gênero. Valor encontrado: "${typeAndGenre}"`
            )
        }

        const tipo = typeAndGenre
            .substring(0, separatorIndex)
            .trim()

        const genero = typeAndGenre
            .substring(separatorIndex + separator.length)
            .trim()

        return {
            tipo,
            genero,
            tema
        }
    }

    async getGrade(essayInformation: {
        tipo: string
        genero: string
        tema: string
    }) {
        await this.page.waitForLoadState('domcontentloaded').catch(() => {})

        const row = this.page
            .locator('div[role="row"]')
            .filter({
                hasText: essayInformation.tema
            })
            .first()

        await expect(row).toBeVisible({
            timeout: 60_000
        })

        const gradeCell = row.locator('[data-field="notaTotal"]')

        await expect(gradeCell).toBeVisible({
            timeout: 60_000
        })

        await expect
            .poll(
                async () => {
                    const text = await gradeCell.textContent()
                    return text?.trim() ?? ''
                },
                {
                    timeout: 90_000,
                    intervals: [1_000, 2_000, 5_000],
                    message: 'A nota ainda não apareceu na linha da redação'
                }
            )
            .toMatch(/\d+/)

        const gradeText = await gradeCell.innerText()

        const gradeMatch = gradeText.match(/\d+(?:[.,]\d+)?/)

        if (!gradeMatch) {
            throw new Error(
                `Não foi possível extrair a nota. Texto encontrado: "${gradeText}"`
            )
        }

        const grade = Number(
            gradeMatch[0].replace(',', '.')
        )

        console.log('Nota da redação:', grade)

        return grade
    }


    async handlePostSubmissionFlow() {
        const allOptions: Array<() => Promise<boolean>> = [
            () => this.closeMidia(),
            () => this.withoutDetailedCorrection(),
            () => this.editGrade(),
            () => this.goBack(),
            () => this.essayBoard(),
        ];

        const maxPasses = 10;

        for (let pass = 0; pass < maxPasses; pass++) {
            let clickedSomething = false;

            for (const tryOption of allOptions) {
                const clicked = await tryOption();

                if (clicked) {
                    clickedSomething = true;
                    break;
                }
            }

            if (!clickedSomething) {
                break;
            }

            await this.page.waitForTimeout(500);
        }
    }

}