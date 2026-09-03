import { test } from '../support/fixtures';
import { Login } from '../support/actions/Login';
import users from '../support/fixtures/data/users.json';

let login: Login;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
});

test('deve realizar login com credenciais válidas', async () => {
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
});