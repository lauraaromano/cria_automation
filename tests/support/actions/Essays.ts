import { Page, expect } from "@playwright/test"
import { essays } from "../fixtures";

export class Essays {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickCreateEssay() {
        await this.page
            .getByRole('button', { name: 'Criar redação' })
            .click();
    }
    async clickStartNewEssay (){
        await this.page
            .getByRole('button', { name: 'Começar nova redação' })
            .click();
    }

    async selectRandomVestibular() {
        const vestibulares = essays.vestibulares;
        const randomIndex = Math.floor(Math.random() * vestibulares.length);
        const vestibularEscolhido = vestibulares[randomIndex];

        await this.page.getByText(vestibularEscolhido, { exact: true }).click();
    }

    async selectVestibular(vestibularEscolhido: string) {

        const vestibularField = this.page.getByText('Busca por vestibular');
        await vestibularField.waitFor({ state: 'visible', timeout: 10000 });
        await vestibularField.click();

        const opcao = this.page.getByText(vestibularEscolhido, { exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();

        const labelResultado = this.page.getByText('Resultado', { exact: true });
        await expect(labelResultado).toBeVisible({ timeout: 5000 });
    }

    async randomTipoTexto(): Promise<string> {
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

    async selectTipoTexto(tipodetextoEscolhido: string) {

        const tipotextoField = this.page.getByText(' Selecione o tipo de texto ');
        await tipotextoField.waitFor({ state: 'visible', timeout: 10000 });
        await tipotextoField.click();

        const opcao = this.page.getByText(tipodetextoEscolhido, { exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();

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

        const message = this.page.getByText('Neste tipo de texto, o CRIA fará uma correção detalhada por 500 moedas, sem atribuir nota.');
        await message.waitFor({ state: 'visible', timeout: 10000 });
    }

    async selectGeneroTextual(generotextualEscolhido: string) {

        const generotextualField = this.page.getByText('Gênero Textual');
        await generotextualField.waitFor({ state: 'visible', timeout: 10000 });
        await generotextualField.click();

        const opcao = this.page.getByText(generotextualEscolhido, { exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();

    }

    async selectRandomArea() {
        const areas = essays.areas;
        const randomIndex = Math.floor(Math.random() * areas.length);
        const areaEscolhido = areas[randomIndex];

        await this.page.getByText(areaEscolhido, { exact: true }).click();
    }

    async selectArea(areaEscolhida: string) {

        const vestibularField = this.page.getByText(' Busca por área');
        await vestibularField.waitFor({ state: 'visible', timeout: 10000 });
        await vestibularField.click();

        const opcao = this.page.getByText(areaEscolhida, { exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();

        const labelResultado = this.page.getByText('Resultado', { exact: true });
        await expect(labelResultado).toBeVisible({ timeout: 5000 });
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


    async selectSearchByKeyword(tema?: string): Promise<string | null> {

        const temaEscolhido = tema ?? essays.temas_redacao[
            Math.floor(Math.random() * essays.temas_redacao.length)
        ];

        const campo = this.page.getByPlaceholder('Busca por palavras chave');

        await campo.click();
        await campo.pressSequentially(temaEscolhido, { delay: 50 });

        const semTemas = this.page.getByText('Sem temas', { exact: true });

        const naoEncontrou = await semTemas.isVisible({ timeout: 3000 }).catch(() => false);

        if (naoEncontrou) {
            return null; // tema não existe na busca — chamador decide o que fazer
        }

        const opcao = this.page.locator('[role="option"]', { hasText: temaEscolhido });
        await opcao.first().waitFor({ state: 'visible', timeout: 5000 });
        await opcao.first().click();

        return temaEscolhido;

    }

    //AÇÕES




































    async createRandomEssay() {

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