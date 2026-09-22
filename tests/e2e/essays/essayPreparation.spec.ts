import { test, users, Essays, Login, expect } from '../../support';
import { essays as essayData } from '../../support/fixtures';

test.setTimeout(0);

let login: Login;
let essays: Essays;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essays = new Essays(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
    await essays.clickCreateEssay();
});

test('deve criar uma redação estilo Enem com sucesso', async () => {
    await essays.selectVestibular("Enem");
    await essays.selectThemeFromResult(essayData.temas_redacao.enem[1]); 
    await essays.selectTipoTexto(essayData.tipo_texto[0]);
    await essays.selectGeneroTextual(essayData.genero_textual.dissertativo[0]);
    await essays.clickStartNewEssay();
});

test('deve criar uma redação com Outros Gêneros (Dissertativo) com sucesso', async () => {
    await essays.selectVestibular(essayData.vestibulares[3]);
    await essays.selectThemeFromResult(essayData.temas_redacao.unesp[4]); 
    await essays.selectTipoTexto(essayData.tipo_texto[0]);
    await essays.selectGeneroTextual(essayData.genero_textual.dissertativo[1]);
    await essays.clickStartNewEssay();
});

test('deve criar uma redação com Outros Gêneros (Narrativo) com sucesso', async () => {
    await essays.selectVestibular(essayData.vestibulares[1]);
    await essays.selectThemeFromResult(essayData.temas_redacao.unicamp[5]);
    await essays.selectTipoTexto(essayData.tipo_texto[1]);
    await essays.selectGeneroTextual(essayData.genero_textual.narrativo[3]);
    await essays.clickStartNewEssay();
});

test('deve selecinar um tema de redação através da Busca por palavra chave de um tema existente', async () => {
    await essays.selectSearchByKeyword("A linguagem neutra em debate no Brasil");
    await essays.selectTipoTexto(essayData.tipo_texto[1]);
    await essays.selectGeneroTextual(essayData.genero_textual.narrativo[0]);
    await essays.clickStartNewEssay();
});

test('deve selecinar um tema de redação através da Busca por palavra Chave de um tema inexistente', async () => {
    const resultado = await essays.selectSearchByKeyword("Os impactos do uso excessivo de telas no desenvolvimento cognitivo de crianças.");

    expect(resultado).toBeNull();
});

test('deve selecinar um vestibular existente como filtro', async () => {
    await essays.selectVestibular(essayData.vestibulares[6]);
    await essays.selectRandomThemeFromResult();
    await essays.selectTipoTexto(essayData.tipo_texto[0]);
    await essays.selectGeneroTextual(essayData.genero_textual.dissertativo[2]);
    await essays.clickStartNewEssay();
});

test('deve selecinar uma área existente como filtro', async () => {
    await essays.selectArea(essayData.areas[2]);
    await essays.selectRandomThemeFromResult();
    await essays.selectTipoTexto(essayData.tipo_texto[1]);
    await essays.selectGeneroTextual(essayData.genero_textual.narrativo[3]);
    await essays.clickStartNewEssay();
});

test('deve selecinar uma área e um vestibular existente como filtro', async () => {
    await essays.selectVestibular(essayData.vestibulares[10]);
    await essays.selectArea(essayData.areas[6]);
    await essays.selectRandomThemeFromResult();
    await essays.selectTipoTexto(essayData.tipo_texto[1]);
    await essays.selectGeneroTextual(essayData.genero_textual.narrativo[1]);
    await essays.clickStartNewEssay();
});

test('deve selecinar um tema de redação através de Outros', async () => {
    await essays.goToRandomThemePageAndSelect();
    await essays.selectTipoTexto(essayData.tipo_texto[0]);
    await essays.selectGeneroTextual(essayData.genero_textual.dissertativo[5]);
    await essays.clickStartNewEssay();
});

test('deve selecinar um tema de redação através do Tema da semana', async () => {
    await essays.selectThemeOfTheWeek();
    await essays.selectTipoTexto(essayData.tipo_texto[1]);
    await essays.selectGeneroTextual(essayData.genero_textual.narrativo[1]);
    await essays.clickStartNewEssay();
});

