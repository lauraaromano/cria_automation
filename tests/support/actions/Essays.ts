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

    async randomTipoTexto(): Promise<string> {
        // Abre a seção de tipo de texto antes de escolher — etapa que faltava
        const tipoTextoSection = this.page.getByText(' Selecione o tipo de texto ', { exact: true });
        await tipoTextoSection.waitFor({ state: 'visible', timeout: 10000 });
        await tipoTextoSection.click();

        const tipo_texto = essays.tipo_texto;
        const randomIndex = Math.floor(Math.random() * tipo_texto.length);
        const tipoTextoEscolhido = tipo_texto[randomIndex];

        const option = this.page.getByText(tipoTextoEscolhido, { exact: true });
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();

        return tipoTextoEscolhido;
    }

    async selectRandomGeneroDissertativo() {
        const generos = essays.genero_textual.dissertativo;
        const randomIndex = Math.floor(Math.random() * generos.length);
        const generoEscolhido = generos[randomIndex];

        await this.page.getByText(generoEscolhido, { exact: true }).click();
    }

    async selectRandomGeneroNarrativo() {
        const generos = essays.genero_textual.narrativo;
        const randomIndex = Math.floor(Math.random() * generos.length);
        const generoEscolhido = generos[randomIndex];

        await this.page.getByText(generoEscolhido, { exact: true }).click();
    }

    async selectRandomArea() {
        const areas = essays.areas;
        const randomIndex = Math.floor(Math.random() * areas.length);
        const areaEscolhido = areas[randomIndex];

        await this.page.getByText(areaEscolhido, { exact: true }).click();
    }

    async goToRandomThemePageAndSelect() {
        // Pega os números de página visíveis e descobre o total de páginas
        const numerosPagina = this.page.locator('.MuiPagination-ul li').filter({ hasText: /^\d+$/ });
        await numerosPagina.first().waitFor({ state: 'visible', timeout: 15000 });

        const textos = await numerosPagina.allTextContents();
        const totalPaginas = Math.max(...textos.map(Number));
        const randomPage = Math.floor(Math.random() * totalPaginas) + 1;

        const nextButton = this.page.getByRole('button', { name: 'Go to next page' });
        const previousButton = this.page.getByRole('button', { name: 'Go to previous page' });
        const currentPageButton = this.page.getByRole('button', { name: /^page \d+$/ });

        let currentPage = Number(await currentPageButton.textContent());

        while (currentPage !== randomPage) {
            if (currentPage < randomPage) {
                await nextButton.click();
            } else {
                await previousButton.click();
            }
            await this.page.waitForLoadState('domcontentloaded');
            currentPage = Number(await currentPageButton.textContent());
        }

        const temas = this.page
            .locator('div.MuiContainer-root.MuiContainer-maxWidthLg')
            .filter({ has: this.page.getByText('Outros Temas', { exact: true }) })
            .locator('> div.MuiGrid-root.MuiGrid-item');

        const count = await temas.count();
        const randomIndex = Math.floor(Math.random() * count);
        await temas.nth(randomIndex).click();
    }

    async selectWeekTheme() {
        const label = this.page.getByText('Tema da semana', { exact: true });
        const labelWrapper = label.locator('xpath=..');
        const themeParagraph = labelWrapper.locator('xpath=following-sibling::p[1]');

        await themeParagraph.waitFor({ state: 'visible', timeout: 10000 });

        await expect(themeParagraph).not.toHaveText('', { timeout: 10000 });

        await themeParagraph.click();
    }

    //AÇÕES
    async createRandomEssay() {
        await this.page.getByRole('button', { name: 'Criar redação   ' }).click();

        const vestibularField = this.page.getByText('Busca por vestibular');
        await vestibularField.waitFor({ state: 'visible', timeout: 10000 });
        await vestibularField.click();
        await this.selectRandomVestibular();

        const areaField = this.page.getByText('Busca por área');
        await areaField.waitFor({ state: 'visible', timeout: 10000 });
        await areaField.click();
        await this.selectRandomArea();

        await this.goToRandomThemePageAndSelect();

        const temaEscolhido = await this.page
            .getByText('Tema Escolhido', { exact: true })
            .isVisible({ timeout: 5000 })
            .catch(() => false);

        if (!temaEscolhido) {
            await this.goToRandomThemePageAndSelect();
        }

        // randomTipoTexto() já abre a seção "Selecione o tipo de texto" internamente
        const tipoEscolhido = await this.randomTipoTexto();

        const generoField = this.page.getByText('  Gênero Textual ');
        await generoField.waitFor({ state: 'visible', timeout: 10000 });
        await generoField.click();

        if (tipoEscolhido === " Dissertativo") {
            await this.selectRandomGeneroDissertativo();
        } else if (tipoEscolhido === 'Narrativo') {
            await this.selectRandomGeneroNarrativo();
        }

        await this.page.getByRole('button', { name: 'Começar nova redação' }).click();
    }

}