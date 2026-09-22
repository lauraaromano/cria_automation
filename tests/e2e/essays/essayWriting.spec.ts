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

test('deve escrever uma redação estilo ENEM e enviar para correção com sucesso', async () => {
    await essays.enemEssay();

});

// test('deve escrever uma redação com menos de 600 caracteres e impedir o envio para correção', async () => {

// });

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