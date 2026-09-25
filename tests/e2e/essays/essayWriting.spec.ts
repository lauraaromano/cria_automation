import { test, expect, users, essays as essayData, retryOnReload, AlertHandler, Essays, EssaysWriting, Login, } from '../../support';


test.setTimeout(0);

let login: Login;
let essaysPreparation: Essays;
let essaysWriting: EssaysWriting;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essaysPreparation = new Essays(page);
    essaysWriting = new EssaysWriting(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
    await essaysPreparation.clickCreateEssay();
});

test('deve escrever uma redação estilo ENEM e enviar para correção com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[3],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[0],
    ), { maxRetries: 5 },);

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].texto);
    },
        { maxRetries: 5 },
    );
    await essaysWriting.AiValidationButton();
    await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    await AlertHandler.expectAlertMessage(page, "Redação validada com sucesso")

});

test('deve escrever uma redação com menos de 600 caracteres e impedir o envio para correção', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[3],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[0],
    ), { maxRetries: 5 },);

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_invalidas.redacoes_menos_600[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_invalidas.redacoes_menos_600[0].texto);
    },
        { maxRetries: 5 },
    );
    await essaysWriting.AiValidationButton();
    await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    await AlertHandler.expectAlertMessage(page, "Tamanho mínimo da redação não atingido, escreva pelo menos 600 caracteres!")

});

test('deve tentar enviar uma redação sem conteúdo e impedir o envio para correção', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[3],
        essayData.temas_redacao.unesp[3],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[2],
    ), { maxRetries: 5 },);

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(' ');
        await essaysWriting.essayTextArea(' ');
    },
        { maxRetries: 5 },
    );
    await essaysWriting.AiValidationButton();
    await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    await AlertHandler.expectAlertMessage(page, "Tamanho mínimo da redação não atingido, escreva pelo menos 600 caracteres!")
});

test('deve tentar enviar uma redação com o idioma inapropriado e impedir o envio para correção', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[3],
        essayData.temas_redacao.unesp[3],
        essayData.tipo_texto[1],
        essayData.genero_textual.narrativo[2],
    ), { maxRetries: 5 },);

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_invalidas.redacoes_idioma_inapropriado[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_invalidas.redacoes_idioma_inapropriado[0].texto);
    },
        { maxRetries: 5 },
    );
    await essaysWriting.AiValidationButton();
    await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    await AlertHandler.expectAlertMessage(page, "Idioma inapropriado! Ocorrência:")

});

test('deve escrever uma redação de texto aleatório/sem sentido e impedir o envio para correção', async ({page}) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[1],
        essayData.temas_redacao.unicamp[4],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[0],
    ), { maxRetries: 5 },);

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_invalidas.redacao_texto_aleatorio[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_invalidas.redacao_texto_aleatorio[0].texto);
    },
        { maxRetries: 5 },
    );
    await essaysWriting.AiValidationButton();
    await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    await AlertHandler.expectAlertMessage(page, "Seu texto não segue o formato de uma dissertação argumentativa válida. Revise a estrutura e o conteúdo")

});

test('deve escrever uma redação com dois parágrafos iguais e impedir o envio para correção', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[7],
        essayData.temas_redacao.fatec[4],
        essayData.tipo_texto[1],
        essayData.genero_textual.narrativo[0],
    ), { maxRetries: 5 },);

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_invalidas.redacoes_repeticao_paragrafo[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_invalidas.redacoes_repeticao_paragrafo[0].texto);
    },
        { maxRetries: 5 },
    );
    await essaysWriting.AiValidationButton();
    await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    await AlertHandler.expectAlertMessage(page, "Repetição de frases desnecessária! Ocorrência: ")

});

test('deve escrever uma redação de outros gêneros textuais e enviar para correção com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[7],
        essayData.temas_redacao.fatec[2],
        essayData.tipo_texto[1],
        essayData.genero_textual.narrativo[3],
    ), { maxRetries: 5 },);

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.narrativo.conto[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.narrativo.conto[0].texto);
    },
        { maxRetries: 5 },
    );
    await essaysWriting.AiValidationButton();
    await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
});

// test('deve digitalizar uma redação de boa qualidade utilizando OCR com sucesso', async () => {

// });

// test('deve tentar digitalizar uma redação de má qualidade utilizando OCR', async () => {

// });

// test('deve digitalizar uma redação com letra manuscrita utilizando OCR', async () => {

// });

// test('deve digitalizar uma redação com letra de forma utilizando OCR', async () => {

// });

// test('deve digitalizar uma redação com letra grande utilizando OCR', async () => {

// });

// test('deve digitalizar uma redação com letra pequena utilizando OCR', async () => {

// });

// test('deve digitalizar uma redação com letra de difícil compreenssão utilizando OCR', async () => {

// });

// test('deve digitalizar uma redação com termos rasurados utilizando OCR', async () => {

// });