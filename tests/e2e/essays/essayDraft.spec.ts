import { test, expect, users, essays as essayData, retryOnReload, AlertHandler, Essays, EssaysWriting, Login, EssayDrafts } from '../../support';

// test.setTimeout(200000);

let login: Login;
let essaysPreparation: Essays;
let essaysWriting: EssaysWriting;
let essayDraft: EssayDrafts;
let oldNumberOfDrafts: number;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essaysPreparation = new Essays(page);
    essaysWriting = new EssaysWriting(page);
    essayDraft = new EssayDrafts(page);
    await login.login(users.otherValidUser.email, users.otherValidUser.password);
    await login.IsLoggedIn(users.otherValidUser.name);
    oldNumberOfDrafts = await essayDraft.validateNumberOfDrafts();

    await essaysPreparation.clickCreateEssay();
});

test('deve salvar um rascunho de uma redação dissertativa com sucesso', async ({ page }) => {
    const tema = essayData.temas_redacao.enem[5];
    const genero = essayData.genero_textual.dissertativo[0];

    await retryOnReload(page,() => essaysPreparation.EssayPreparation(
            essayData.vestibulares[0],
            tema,
            essayData.tipo_texto[0],
            genero,
        ),
    );
    await retryOnReload(page,async () => {
            await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].titulo,);
            await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].texto,);
            await essayDraft.saveThemeAndGenre();
            await essayDraft.draftSave();
            await AlertHandler.expectAlertMessage(page,'Redação salva com sucesso',);
        },
    );

    await retryOnReload(page,async () => {
            await essaysWriting.backToTheMainScreen();
            await essaysWriting.sureToGoBack();
        },
    );
    await retryOnReload(page, async () => {
            await essayDraft.validateDraftWasAdded(oldNumberOfDrafts);
            await essayDraft.openDraftsTab();
            await essayDraft.verifyThemeAndGenre();
            await essayDraft.deleteDraft();
            await AlertHandler.expectAlertMessage(page,'Rascunho excluído com sucesso!',);
        },
    );
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

        await essayDraft.saveThemeAndGenre();

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso");

    },
    );
    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen();
        await essaysWriting.sureToGoBack();
    },);
  
    await retryOnReload(page, async () => {
        await essayDraft.validateDraftWasAdded(oldNumberOfDrafts);
        await essayDraft.openDraftsTab()
    }, { recoveryButtonName: 'RASCUNHOS' });

    await retryOnReload(page, async () => {
        await essayDraft.verifyThemeAndGenre();
        await essayDraft.deleteDraft();
        await AlertHandler.expectAlertMessage(page,'Rascunho excluído com sucesso!',);
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

        await essayDraft.saveThemeAndGenre();

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso");
    }, );

    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen();
        await essaysWriting.sureToGoBack();
    }, );

    await retryOnReload(page, async () => {
        await essayDraft.validateDraftWasAdded(oldNumberOfDrafts);
        await essayDraft.openDraftsTab();
        await essayDraft.verifyThemeAndGenre();

    }, { recoveryButtonName: 'RASCUNHOS' });

    await retryOnReload(page, async () => {
        await essayDraft.deleteDraft();
        await AlertHandler.expectAlertMessage(page, "Rascunho excluído com sucesso!");

    }, { recoveryButtonName: 'RASCUNHOS' });


});

test('deve excluir um rascunho de uma redação narrativa com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[2],
        essayData.temas_redacao.fuvest[1],
        essayData.tipo_texto[1],
        essayData.genero_textual.narrativo[2],
    ),
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.narrativo.notícia[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.narrativo.notícia[0].texto);

        await essayDraft.saveThemeAndGenre();

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso");

    },
    );

    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen();
        await essaysWriting.sureToGoBack();
    },
    );

    await retryOnReload(page, async () => {
        await essayDraft.validateDraftWasAdded(oldNumberOfDrafts);
        await essayDraft.openDraftsTab();
        await essayDraft.verifyThemeAndGenre();
        await essayDraft.deleteDraft();
        await AlertHandler.expectAlertMessage(page, "Rascunho excluído com sucesso!");

    }, { recoveryButtonName: 'RASCUNHOS' });
});

test('deve abrir um rascunho de uma redação dissertativa com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[9],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[2],
    ),
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.dissertativo.editorial[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.dissertativo.editorial[0].texto);

        await essayDraft.saveThemeAndGenre();

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso");


    },
    );

    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen();
        await essaysWriting.sureToGoBack();
    }, );

    await retryOnReload(page, async () => {
        await essayDraft.validateDraftWasAdded(oldNumberOfDrafts);
        await essayDraft.openDraftsTab();
        await essayDraft.verifyThemeAndGenre();
        await essayDraft.openDraft();

        await essaysWriting.backToTheMainScreen();
        await essaysWriting.sureToGoBack();

        await essayDraft.openDraftsTab();
        await essayDraft.verifyThemeAndGenre();
        await essayDraft.deleteDraft();
        await AlertHandler.expectAlertMessage(page, "Rascunho excluído com sucesso!");

    }, { recoveryButtonName: 'RASCUNHOS' });
});

test('deve abrir um rascunho de uma redação narrativa com sucesso', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.EssayPreparation(
        essayData.vestibulares[2],
        essayData.temas_redacao.fuvest[3],
        essayData.tipo_texto[1],
        essayData.genero_textual.narrativo[0],
    ),
    );

    await retryOnReload(page, async () => {
        await essaysWriting.essayTitle(essayData.redacoes.redacoes_validas.narrativo.crônica[0].titulo);
        await essaysWriting.essayTextArea(essayData.redacoes.redacoes_validas.narrativo.crônica[0].texto);

        await essayDraft.saveThemeAndGenre();

        await essayDraft.draftSave();

        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso");

        await essaysWriting.backToTheMainScreen();
        await essaysWriting.sureToGoBack();
    },
    );
    await retryOnReload(page, async () => {
        await essayDraft.validateDraftWasAdded(oldNumberOfDrafts);
        await essayDraft.openDraftsTab();
        await essayDraft.verifyThemeAndGenre();
        await essayDraft.openDraft();
    }, { recoveryButtonName: 'RASCUNHOS' });

    await retryOnReload(page, async () => {
        await essaysWriting.backToTheMainScreen();
        await essaysWriting.sureToGoBack();
    }, );

     await retryOnReload(page, async () => {
        await essayDraft.openDraftsTab();
        await essayDraft.verifyThemeAndGenre();
        await essayDraft.deleteDraft();
        await AlertHandler.expectAlertMessage(page, "Rascunho excluído com sucesso!");
    }, );   
});




