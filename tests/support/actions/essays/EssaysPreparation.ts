import { Page, expect } from "@playwright/test"
import { essays } from "../../fixtures";

async function skipIfAlreadyDone(page: Page, doneMarkerText: string, exact = true): Promise<boolean> {
    return await page.getByText(doneMarkerText, { exact }).isVisible({ timeout: 1000 }).catch(() => false);
}

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

    async clickStartNewEssay() {
        await this.page
            .getByRole('button', { name: 'Começar nova redação' })
            .click();
    }

    async selectVestibular(vestibularEscolhido: string) {

        if (await skipIfAlreadyDone(this.page, 'Tema Escolhido')) return;
        const vestibularField = this.page.getByText('Busca por vestibular').first();
        await vestibularField.waitFor({ state: 'visible', timeout: 10000 });
        await vestibularField.click();

        const opcao = this.page.getByRole('option', { name: vestibularEscolhido, exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();

        const labelResultado = this.page.getByText('Resultado', { exact: true });
        await expect(labelResultado).toBeVisible({ timeout: 5000 });
    }

    async selectThemeOfTheWeek() {

        if (await skipIfAlreadyDone(this.page, 'Tema Escolhido')) return;

        const label = this.page.getByText('Tema da semana', { exact: true });
        await label.waitFor({ state: 'visible', timeout: 10000 });

        const container = this.page.locator('div.MuiContainer-root', { has: label }).last();

        const themeText = container
            .locator('p')
            .filter({ hasNotText: 'Tema da semana' })
            .first();

        await themeText.waitFor({ state: 'visible', timeout: 10000 });

        await expect(themeText).not.toHaveText('', { timeout: 10000 });

        const textoEscolhido = (await themeText.textContent())?.trim();
        console.log(`[selectThemeOfTheWeek] tema da semana: ${textoEscolhido}`);

        await themeText.click();

        const temaEscolhidoLabel = this.page.getByText('Tema Escolhido', { exact: true });
        await temaEscolhidoLabel.waitFor({ state: 'visible', timeout: 5000 });
    }

    async selectTipoTexto(tipodetextoEscolhido: string) {

        if (await skipIfAlreadyDone(this.page, tipodetextoEscolhido)) return;

        const placeholder = this.page.getByText(' Selecione o tipo de texto ').first();
        await placeholder.waitFor({ state: 'visible', timeout: 10000 });

        const comboboxHandle = await placeholder
            .locator('xpath=ancestor::*[@role="combobox"]')
            .first()
            .elementHandle();

        if (!comboboxHandle) {
            throw new Error('[selectTipoTexto] combobox pai não encontrado.');
        }

        await comboboxHandle.click();

        const opcao = this.page.getByRole('option', { name: tipodetextoEscolhido, exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();


        await expect
            .poll(async () => (await comboboxHandle.textContent())?.trim(), { timeout: 5000 })
            .toContain(tipodetextoEscolhido);
    }

    async selectGeneroTextual(generotextualEscolhido: string) {

        if (await skipIfAlreadyDone(this.page, generotextualEscolhido)) return;

        const placeholder = this.page.getByText('Gênero Textual', { exact: true }).first();
        await placeholder.waitFor({ state: 'visible', timeout: 10000 });

        const comboboxHandle = await placeholder
            .locator('xpath=ancestor::*[@role="combobox"]')
            .first()
            .elementHandle();

        if (!comboboxHandle) {
            throw new Error('[selectGeneroTextual] combobox pai não encontrado.');
        }

        await comboboxHandle.click();

        const opcao = this.page.getByRole('option', { name: generotextualEscolhido, exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();

        await expect
            .poll(async () => (await comboboxHandle.textContent())?.trim(), { timeout: 5000 })
            .toContain(generotextualEscolhido);
    }

    async selectArea(areaEscolhida: string) {
        if (await skipIfAlreadyDone(this.page, 'Resultado')) return;

        const areaField = this.page.getByText(' Busca por área').first();
        await areaField.waitFor({ state: 'visible', timeout: 10000 });
        await areaField.click();

        const opcao = this.page.getByRole('option', { name: areaEscolhida, exact: true });
        await opcao.waitFor({ state: 'visible', timeout: 10000 });
        await opcao.click();

        const labelResultado = this.page.getByText('Resultado', { exact: true });
        await expect(labelResultado).toBeVisible({ timeout: 5000 });
    }

    async selectThemeFromResult(themeName: string) {

        if (await skipIfAlreadyDone(this.page, 'Tema Escolhido')) return;

        const resultTitle = this.page.getByText('Resultado', { exact: true });
        await resultTitle.waitFor({ state: 'visible', timeout: 10000 });

        const themeOption = this.page.getByText(themeName, { exact: true });
        await themeOption.waitFor({ state: 'visible', timeout: 10000 });
        await themeOption.click();

        await expect(themeOption).toBeVisible({ timeout: 5000 });
    }

    async selectRandomThemeFromResult() {

        if (await skipIfAlreadyDone(this.page, 'Tema Escolhido')) return;

        const resultTitle = this.page.getByText('Resultado', { exact: true });
        await resultTitle.waitFor({ state: 'visible', timeout: 10000 });

        const resultContainer = this.page.locator('div', { has: resultTitle }).last();
        const themeOptions = resultContainer.locator('p');

        const count = await themeOptions.count();
        if (count === 0) {
            throw new Error('Nenhum tema encontrado na lista de Resultado.');
        }

        const randomIndex = Math.floor(Math.random() * count);
        const chosen = themeOptions.nth(randomIndex);

        await chosen.waitFor({ state: 'visible' });
        const chosenText = await chosen.textContent();
        console.log(`[selectRandomThemeFromResult] tema escolhido: ${chosenText}`);

        await chosen.click();
    }

    async goToRandomThemePageAndSelect() {

        if (await skipIfAlreadyDone(this.page, 'Tema Escolhido')) return;

        const numerosPagina = this.page.locator('.MuiPagination-ul li').filter({ hasText: /^\d+$/ });
        await numerosPagina.first().waitFor({ state: 'visible', timeout: 15000 });

        const textos = await numerosPagina.allTextContents();
        const totalPaginas = Math.max(...textos.map(Number));
        
        const limiteMaximo = Math.min(totalPaginas, 88);
        const randomPage = Math.floor(Math.random() * limiteMaximo) + 1;

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
        if (count === 0) {
            throw new Error('[goToRandomThemePageAndSelect] Nenhum tema encontrado em "Outros Temas" após navegação de página.');
        }

        const randomIndex = Math.floor(Math.random() * count);
        await temas.nth(randomIndex).click();

        const temaEscolhidoLabel = this.page.getByText('Tema Escolhido', { exact: true });
        await temaEscolhidoLabel.waitFor({ state: 'visible', timeout: 5000 });
    }

    async selectSearchByKeyword(
        tema?: string,
        vestibular?: keyof typeof essays.temas_redacao): Promise<string | null> {
        type Vestibular = keyof typeof essays.temas_redacao;

        const vestibulares = Object.keys(
            essays.temas_redacao
        ) as Vestibular[];
        const vestibularEscolhido =
            vestibular ??
            vestibulares[
            Math.floor(Math.random() * vestibulares.length)
            ];
        const temasDoVestibular =
            essays.temas_redacao[vestibularEscolhido];
        const temaEscolhido =
            tema ??
            temasDoVestibular[
            Math.floor(Math.random() * temasDoVestibular.length)
            ];
        const campo = this.page.getByPlaceholder(
            'Busca por palavras chave'
        );
        await campo.click();
        await campo.fill('');

        await campo.pressSequentially(
            temaEscolhido,
            { delay: 50 }
        );
        const semTemas = this.page.getByText(
            'Sem temas',
            { exact: true }
        );
        const naoEncontrou = await semTemas
            .isVisible({ timeout: 3000 })
            .catch(() => false);
        if (naoEncontrou) {
            return null;
        }
        const opcao = this.page.locator(
            '[role="option"]',
            { hasText: temaEscolhido }
        );
        await opcao.first().waitFor({
            state: 'visible',
            timeout: 5000
        });
        await opcao.first().click();
        return temaEscolhido;
    }

    async EssayPreparation(vestibular: string, result: string, tipo_texto: string, genero: string) {
        await this.selectVestibular(vestibular);
        await this.selectThemeFromResult(result);
        await this.selectTipoTexto(tipo_texto);
        await this.selectGeneroTextual(genero);
        await this.clickStartNewEssay();
    }

}