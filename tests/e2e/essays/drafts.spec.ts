import { test, users, Essays, Login } from '../../support';

let login: Login;
let essays: Essays;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essays = new Essays(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
});

test('deve criar rascunho de redação ENEM', async ({ page }) => {
    
    await page.getByRole('button', { name: 'Criar redação   ' }).click();
    await page.getByText('Busca por vestibular').click();



});

