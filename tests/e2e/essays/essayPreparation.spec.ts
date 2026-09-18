import { text } from 'node:stream/consumers';
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

test('deve criar uma redação aleatória com sucesso', async () => {
    await essays.createRandomEssay();
});

test('deve criar uma redação estilo Enem com sucesso', async () => {
    await essays.selectVestibular(essayData.vestibulares[0]);
    await essays.selectThemeFromResult("O movimento imigratório para o Brasil");
    await essays.selectTipoTexto("Dissertativo");
    await essays.selectGeneroTextual(essayData.genero_textual.dissertativo[0]);
    await essays.clickStartNewEssay();
});

test('deve criar uam redação com Outros Gêneros (Dissertativo) com sucesso', async () => {
    await essays.selectVestibular(essayData.vestibulares[3]);
    await essays.selectThemeFromResult("Tempo é dinheiro?");
    await essays.selectTipoTexto("Dissertativo");
    await essays.selectGeneroTextual(essayData.genero_textual.dissertativo[1]);
    await essays.clickStartNewEssay();
});

test('deve criar uam redação com Outros Gêneros (Narrativo) com sucesso', async () => {
    await essays.selectVestibular(essayData.vestibulares[1]);
    await essays.selectThemeFromResult("Racismo no ambiente escolar");
    await essays.selectTipoTexto("Narrativo");
    await essays.selectGeneroTextual("Conto");
    await essays.clickStartNewEssay();
});

test('deve selecinar um tema de redação através da Busca por palavra chave de um tema existente', async () => {
    await essays.selectSearchByKeyword("A linguagem neutra em debate no Brasil");
    await essays.selectTipoTexto("Narrativo");
    await essays.selectGeneroTextual("Relato");
    await essays.clickStartNewEssay();

});

test('deve selecinar um tema de redação através da Busca por palavra Chave de um tema inexistente', async () => {
    const resultado= await essays.selectSearchByKeyword("Os impactos do uso excessivo de telas no desenvolvimento cognitivo de crianças.");

    expect(resultado).toBeNull();
   
});

test('deve selecinar um vestibular existente como filtro', async () => {
    await essays.selectVestibular(essayData.vestibulares[6]);
    await essays.selectRandomThemeFromResult();
});

test('deve selecinar uma área existente como filtro', async () => {
    await essays.selectArea(essayData.areas[2]);
    await essays.selectRandomThemeFromResult();
});

test('deve selecinar uma área e um vestibular existente como filtro', async () => {
    await essays.selectVestibular(essayData.vestibulares[10]);
    await essays.selectArea(essayData.areas[6]);
    await essays.selectRandomThemeFromResult();


});

// test('deve selecinar um tema de redação através do Tema da semana', async ({page}) => {
//    await essays.selectThemeOfTheWeek();
//     await page.waitForTimeout(10000);

// });

// test('deve selecinar um tema de redação através de Outros', async () => {
   
// });


