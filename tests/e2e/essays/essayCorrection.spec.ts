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
    await login.isLoggedIn(users.valid.name);
    await essaysPreparation.clickCreateEssay();
});

test('deve salvar uma redação dissertativa-argumentativa ENEM sem correção detalhada', async ({ page }) => {
    await retryOnReload(page, () => essaysPreparation.essayPreparation(
        essayData.vestibulares[0],
        essayData.temas_redacao.enem[11],
        essayData.tipo_texto[0],
        essayData.genero_textual.dissertativo[0],
    ),
    );
    const essayInformation = await essayCorrection.getEssayInformation()

    await retryOnReload(page, () => essaysWriting.essayWritingAndValidateWithAI(
        essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].titulo,
        essayData.redacoes.redacoes_validas.dissertativo.dissertativo_argumentativo[0].texto,
        essayInformation
    ));

    await retryOnReload(page, async () => {
     
        await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso")
        await AlertHandler.expectAlertMessage(page, "Redação validada com sucesso")
        await essayCorrection.perfectScore();
        await essayCorrection.withoutDetailedCorrection();
        await essayCorrection.correctionBtn(' Editar nota correção simples');
        
        await essayCorrection.handlePostSubmissionFlow();
    },{ recoveryButtonName: 'REDAÇÕES' }
    );
 
});



test('deve salvar uma redação dissertativaargumentativa ENEM com correção detalhada', async ({ page }) => {
    await retryOnReload(page, () =>
        essaysPreparation.essayPreparation(
            essayData.vestibulares[0],
            essayData.temas_redacao.enem[6],
            essayData.tipo_texto[0],
            essayData.genero_textual.dissertativo[0],
        )
    )
    const essayInformation = await essayCorrection.getEssayInformation()

    await retryOnReload(page, () =>
        essaysWriting.essayWritingAndValidateWithAI(
            essayData.redacoes.redacoes_validas
                .dissertativo
                .dissertativo_argumentativo[0]
                .titulo,
            essayData.redacoes.redacoes_validas
                .dissertativo
                .dissertativo_argumentativo[0]
                .texto,
            essayInformation

        )
    )
    await retryOnReload( page, async () => {
            await AlertHandler.expectAlertMessage(page,'Redação salva com sucesso')

            await AlertHandler.expectAlertMessage(page,'Redação validada com sucesso')

            await essayCorrection.perfectScore()
            await essayCorrection.correctionBtn('Usar 1000 CRIA coins')
            await AlertHandler.expectAlertMessage(page,'Redação enviada para processamento!'
            )

        },
        { recoveryButtonName: 'REDAÇÕES' }
    )
    await retryOnReload( page, async () => {
            await essayCorrection.handlePostSubmissionFlow()
        },
        { recoveryButtonName: 'REDAÇÕES' }
    )
    // await retryOnReload( page, async () => {
    //         await page.waitForTimeout(70_000)
    //         // await essayCorrection.getGrade(essayInformation)
    //     },
    //     { recoveryButtonName: 'REDAÇÕES' }
    // )
})


// Esse caso de teste está pausado, pois somente é possível realiza-lo 1 vez dentro das circunstâncias
// test('deve salvar uma redação narrativa sem correção detalhada', async ({ page }) => {

//     await retryOnReload(page, () => essaysPreparation.essayPreparation(
//         essayData.vestibulares[1],
//         essayData.temas_redacao.unicamp[4],
//         essayData.tipo_texto[1],
//         essayData.genero_textual.narrativo[0],
//     ),
//     );
//     const essayInformation = await essayCorrection.getEssayInformation()
    
//     await retryOnReload(page, () => essaysWriting.essayWritingAndValidateWithAI(
//         essayData.redacoes.redacoes_validas.narrativo.crônica[0].titulo,
//         essayData.redacoes.redacoes_validas.narrativo.crônica[0].texto,
//         essayInformation
//     ));

//     await retryOnReload(page, async () => {
     
//         await AlertHandler.expectAlertMessage(page, "Redação salva com sucesso");
//         await AlertHandler.expectAlertMessage(page, "Redação validada com sucesso");
        
//         await essayCorrection.correctionBtn('Usar 500 CRIA coins');
//         await AlertHandler.expectAlertMessage(page, "Redação enviada para processamento!");

        
//         await essayCorrection.handlePostSubmissionFlow();
//     },{ recoveryButtonName: 'REDAÇÕES' }
//     );
// });







