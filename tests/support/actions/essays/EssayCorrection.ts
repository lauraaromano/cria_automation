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

    async withoutDetailedCorrection(): Promise<boolean> {
        return this.clickIfVisible(' Salvar sem correção detalhada');
    }

    async editGrade(): Promise<boolean> {
        return this.clickIfVisible(' Editar nota correção simples');
    }

    async goBack(): Promise<boolean> {
        return this.clickIfVisible('Voltar para tela inicial');
    }

    async essayBoard(): Promise<boolean> {
        const clicked = await this.clickIfVisible('Painel de redações ');
        if (clicked) {
            await expect(this.page).toHaveURL('/');
        }
        return clicked;
    }

    async closeMidia(): Promise<boolean> {
        const closeIcon = this.page.getByTestId('CloseIcon');
        const isVisible = await closeIcon.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
            await closeIcon.click();
            console.log('[EssayCorrection] fechou mídia/modal');
            return true;
        }
        return false;
    }

    async narrativoCorrection(){
        await this.page.getByRole('button', { name: 'Usar 500 CRIA coins', exact: true }).click()
    }

    async handlePostSubmissionFlow(): Promise<void> {

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
        }
    }
}