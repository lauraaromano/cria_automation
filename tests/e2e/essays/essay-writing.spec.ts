import { test, users, Essays, Login } from '../../support';

let login: Login;
let essays: Essays;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essays = new Essays(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
});

test('deve criar uma redação do tipo ENEM', async ({ page }) => {
    test.setTimeout(90000); // 90s só pra esse teste

    await essays.createEssay();
    // await page.waitForTimeout(10000); // pausa 10s antes de finalizar

});