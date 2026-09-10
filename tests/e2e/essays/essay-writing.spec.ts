import { test, users, Essays, Login } from '../../support';

let login: Login;
let essays: Essays;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essays = new Essays(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
});

test('deve criar uma redação', async ({ page }) => {
    test.setTimeout(0);

    await essays.createRandomEssay();

});