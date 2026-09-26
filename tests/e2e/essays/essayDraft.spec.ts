import { test, users, essays as essayData, retryOnReload, AlertHandler, Essays, EssaysWriting, Login, EssayDrafts} from '../../support';

test.setTimeout(0);

let login: Login;
let essaysPreparation: Essays;
let essaysWriting: EssaysWriting;
let essayDraft: EssayDrafts;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essaysPreparation = new Essays(page);
    essaysWriting = new EssaysWriting(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
    await essaysPreparation.clickCreateEssay();
});

test('deve salvar um rascunho de uma redação dissertativa com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[3],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[0],
    ), 
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].texto);

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    },
    );


});

test('deve salvar um rascunho de uma redação narrativa com sucesso', async ({ page }) => {

});

