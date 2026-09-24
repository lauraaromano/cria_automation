import { test, users, Essays, EssaysWriting, Login, expect } from '../../support';
import { AlertHandler, essays as essayData, retryOnReload } from '../../support/fixtures';

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
    ),
        { maxRetries: 5 },
    );
    await retryOnReload(
        page,
        async () => {
            await essaysWriting.essayTitle(essayData.redações.redacoes_validas[0].titulo);
            await essaysWriting.essayTextArea(essayData.redações.redacoes_validas[0].texto);
        },
        { maxRetries: 5 },
    );

    await essaysWriting.AiValidationButton();
    // await AlertHandler.expectAlertMessage(page, "Redação validada com sucesso")
    // FALTA COLOCAR AS VALIDAÇÕES DAS DUAS MENSAGENS QUE APARECEM
});

test('deve escrever uma redação com menos de 600 caracteres e impedir o envio para correção', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[3],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[0],
    ),
        { maxRetries: 5 },
    );
    await retryOnReload(
        page,
        async () => {
            await essaysWriting.essayTitle(essayData.redações.redacoes_menos_600[0].titulo);
            await essaysWriting.essayTextArea(essayData.redações.redacoes_menos_600[0].texto);
        },
        { maxRetries: 5 },
    );

    await essaysWriting.AiValidationButton();
});

// test('deve tentar enviar uma redação sem conteúdo e impedir o envio para correção', async () => {

// });

// test('deve tentar enviar uma redação com o idioma inapropriado e impedir o envio para correção', async () => {

// });

// test('deve escrever uma redação fora da estrutura de uma dissertação argumentativa e impedir o envio para correção', async () => {

// });

// test('deve escrever uma redação com dois parágrafos iguais e impedir o envio para correção', async () => {

// });

// test('deve escrever uma redação de outros gêneros textuais e enviar para correção com sucesso', async () => {

// });

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