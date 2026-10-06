import { test, expect, users, essays as essayData, retryOnReload, AlertHandler, Essays, EssaysWriting, Login, EssayDrafts, EssayCorrection } from '../../support';

test.setTimeout(200000);

let login: Login;
let essaysPreparation: Essays;
let essaysWriting: EssaysWriting;
let essayDraft: EssayDrafts;
let essayCorrection: EssayCorrection;


test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essaysPreparation = new Essays(page);
    essaysWriting = new EssaysWriting(page);
    essayDraft = new EssayDrafts(page);
    essayCorrection = new EssayCorrection(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn(users.valid.name);
    await essaysPreparation.clickCreateEssay();
});

test('deve salvar uma redação dissertativa sem correção detalhada', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[2],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[0],
    ),
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].texto);
        await essaysWriting.AiValidationButton();
    },
    );
        await retryOnReload(page, async () => {
     
        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
        await AlertHandler.expectAlertMessage(page, "Redação validada com sucesso")
        await essayCorrection.perfectScore();
        await essayCorrection.withoutDetailedCorrection();
        
        await essayCorrection.handlePostSubmissionFlow();
    },{ recoveryButtonName: 'REDAÇÕES' }
    );
 
});

test('deve salvar uma redação narrativa sem correção detalhada', async ({ page }) => {

    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[0],
        essayData.tipo_texto[1],
        essayData.genero_textual.narrativo[0],
    ),
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.narrativo.crônica[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.narrativo.crônica[0].texto);
        await essaysWriting.AiValidationButton();
    },
    );
    await retryOnReload(page, async () => {
     
        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
        await AlertHandler.expectAlertMessage(page, "Redação validada com sucesso")
        
        await essayCorrection.narrativoCorrection()
        await AlertHandler.expectAlertMessage(page, "Redação enviada para processamento!")

        
        await essayCorrection.handlePostSubmissionFlow();
    },{ recoveryButtonName: 'REDAÇÕES' }
    );
});







