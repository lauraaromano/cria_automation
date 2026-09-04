import { test, users, Login } from '../support';

let login: Login;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
});

test('deve realizar logout com sucesso', async () => {
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
    await login.Logout();
});

