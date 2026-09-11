import { test, users, Essays, Login, expect } from '../../support';

let login: Login;
let essays: Essays;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    essays = new Essays(page);
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
    test.setTimeout(0);

});

test('deve criar uma redação aleatória com sucesso', async () => {
    await essays.createRandomEssay();
});

test('deve criar uam redação estilo Enem com sucesso', async () => {

});

test('deve criar uam redação com Outros Gêneros (Dissertativo) com sucesso', async () => {

});

test('deve criar uam redação com Outros Gêneros (Narrativo) com sucesso', async () => {

});

test('deve selecinar um tema de redação através da Busca por palavra chave de um tema existente', async () => {
   
});

test('deve selecinar um tema de redação através da Busca por palavra Chave de um tema inexistente', async () => {
   
});

test('deve selecinar um vestibular existente como filtro', async () => {
   
});

test('deve selecinar uma área existente como filtro', async () => {
   
});

test('deve selecinar uma área e um vestibular existente como filtro', async () => {
   
});

test('deve selecinar um tema de redação através do Tema da semana', async () => {
   
});

test('deve selecinar um tema de redação através de Outros', async () => {
   
});


