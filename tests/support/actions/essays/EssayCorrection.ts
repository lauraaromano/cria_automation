import { Page, expect } from "@playwright/test"
import { essays } from "../../fixtures";

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

    async narrativeCorrection(){
        await this.page.getByRole('button', { name: 'Usar 500 CRIA coins', exact: true }).click()
    }

    async simpleCorrection(){
        await this.page.getByRole('button', { name: ' Editar nota correção simples', exact: true }).click()
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