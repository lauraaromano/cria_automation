import { test, expect, users, essays as essayData, retryOnReload, AlertHandler, Essays, EssaysWriting, Login, EssayDrafts } from '../../support';

test.setTimeout(200000);

let login: Login;
let essaysPreparation: Essays;
let essaysWriting: EssaysWriting;
let essayDraft: EssayDrafts;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essaysPreparation = new Essays(page);
    essaysWriting = new EssaysWriting(page);
    essayDraft = new EssayDrafts(page);
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

        await essayDraft.guardarTemaEGenero()

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    },
    );
    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen()
        await essaysWriting.sureToGoBack()
    },
    );
    await retryOnReload(page, async () => {
        await essayDraft.openDraftsTab()
    }, { recoveryButtonName: 'RASCUNHOS' });

});

test('deve salvar um rascunho de uma redação narrativa com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[3],
        essayData.temas_redacao.unesp[3],
        essayData.tipo_texto[1],
        essayData.genero_textual.narrativo[2],
    ),
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.narrativo.Relato[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.narrativo.Relato[0].texto);

        await essayDraft.guardarTemaEGenero()

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    },
    );
    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen()
        await essaysWriting.sureToGoBack()
    },
    );
    await retryOnReload(page, async () => {
        await essayDraft.openDraftsTab()
    }, { recoveryButtonName: 'RASCUNHOS' });

    await retryOnReload(page, async () => {
        await essayDraft.verificarTemaEGenero()
    }, { recoveryButtonName: 'RASCUNHOS' });
});

test('deve excluir um rascunho de uma redação dissertativa com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[2],
        essayData.temas_redacao.fuvest[4],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[3],
    ),
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.dissertativo.carta_aberta[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.dissertativo.carta_aberta[0].texto);

        await essayDraft.guardarTemaEGenero()

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
    },
    );
    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen()
        await essaysWriting.sureToGoBack()
    },
    );
    await retryOnReload(page, async () => {
        await essayDraft.openDraftsTab()
        await essayDraft.deleteDraft()

    }, { recoveryButtonName: 'RASCUNHOS' });


});

// test('deve excluir um rascunho de uma redação narrativa com sucesso', async ({ page }) => {

// });

// test('deve abrir um rascunho de uma redação dissertativa com sucesso', async ({ page }) => {

// });

// test('deve abrir um rascunho de uma redação narrativa com sucesso', async ({ page }) => {

// });


