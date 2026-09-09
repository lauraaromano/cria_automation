import { Page, expect } from "@playwright/test"
import { essays } from "../fixtures";

export class Essays {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectRandomVestibular() {
        const vestibulares = essays.vestibulares;
        const randomIndex = Math.floor(Math.random() * vestibulares.length);
        const vestibularEscolhido = vestibulares[randomIndex];

        await this.page.getByText(vestibularEscolhido, { exact: true }).click();
    }

    async selectRandomArea() {
        const areas = essays.areas;
        const randomIndex = Math.floor(Math.random() * areas.length);
        const areaEscolhido = areas[randomIndex];

        await this.page.getByText(areaEscolhido, { exact: true }).click();
    }

    
    async goToRandomThemePageAndSelect() {
        const numerosPagina = this.page.locator('.MuiPagination-ul li').filter({ hasText: /^\d+$/ });
        const textos = await numerosPagina.allTextContents();
        const numeros = textos.map(Number);
        const totalPaginas = Math.max(...numeros);

        const randomPage = Math.floor(Math.random() * totalPaginas) + 1;

        const targetPageButton = this.page.getByRole('button', { name: `Go to page ${randomPage}`, exact: true });
        const nextButton = this.page.getByRole('button', { name: 'Go to next page' });

        while (!(await targetPageButton.isVisible().catch(() => false))) {
            await nextButton.click();
            await this.page.waitForResponse(response => response.status() === 200).catch(() => { });
        }

        await targetPageButton.click();

        const temas = this.page.locator('li').filter({ hasText: 'Outros Temas' });
        const count = await temas.count();
        const randomIndex = Math.floor(Math.random() * count);

        await temas.nth(randomIndex).click();
    }


    //AÇÕES
    async createEssay() {

        await this.page.getByRole('button', { name: 'Criar redação   ' }).click();
        // await this.page.getByText('Busca por vestibular').click();
        // await this.selectRandomVestibular();
        // await this.page.getByText('Busca por área').click();
        // await this.selectRandomArea();
        await this.goToRandomThemePageAndSelect();
        await this.goToRandomThemePageAndSelect();


    }

    async createEnemEssay() {
        await this.page.getByRole('button', { name: 'Criar redação   ' }).click();
        await this.page.getByText('Busca por vestibular').click();
        await this.page.getByText('Enem').click();
        await this.selectRandomArea();

    }

    async createEssayWithRandomTheme() {
        await this.goToRandomThemePageAndSelect();
    }

}