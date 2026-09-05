import { test, users, Login, ErrorHandler, AlertHandler } from '../../support';

let login: Login;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
});

test('deve realizar login com credenciais válidas', async () => {
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
});

test('não deve realizar login com os campos de email e senha vazios', async ({ page }) => {

    await login.login('', '');
    await ErrorHandler.expectFieldError(page, 'E-mail ou CPF:', 'Obrigatório');
    await ErrorHandler.expectFieldError(page, 'Senha', 'Obrigatório');
});

test('não deve realizar login com email válido e senha inválida', async ({ page }) => {

    await login.login(users.valid.email, users.invalidPassword.password);
    await AlertHandler.expectAlertMessage(page, 'Senha inválida!');
});

test('não deve realizar login com usuário inválido e senha válida', async ({ page }) => {
    await login.login(users.valid.password, users.invalidEmail.email);
    await AlertHandler.expectAlertMessage(page, 'Usuário não encontrado!');

});

test('não deve realizar login quando o campo de usuário estiver vazio', async ({ page }) => {
    await login.login('', users.valid.password);
    await ErrorHandler.expectFieldError(page, 'E-mail ou CPF:', 'Obrigatório');
});

test('não deve realizar login quando o campo de senha estiver vazio', async ({ page }) => {
    await login.login(users.valid.email, '');
    await ErrorHandler.expectFieldError(page, 'Senha', 'Obrigatório');

});
