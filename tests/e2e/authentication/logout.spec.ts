import { test, users, Login } from '../../support';

let login: Login;

test.beforeEach(async ({ page }) => {
    login = new Login(page);    
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
});

test('deve realizar logout com sucesso', async () => {
    await login.Logout();
});





