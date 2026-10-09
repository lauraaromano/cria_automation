import { test, users, Login, ErrorHandler, AlertHandler, ProfileData, retryOnReload, dismissPopupsNow, expect } from '../../support';

test.setTimeout(0);

let login: Login;
let profileData: ProfileData;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    profileData = new ProfileData(page)
    await login.login(users.otherValidUser.email, users.otherValidUser.password);
    await login.IsLoggedIn(users.otherValidUser.name);
});

test('deve alterar o Nome Completo do usuário com sucesso', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
    
        await profileData.editMyData("Meus dados")

        await profileData.editName(users.nameChanged.name)
        await profileData.saveChanges()
    },
    );

    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
        await profileData.editMyData("Meus dados")

        await profileData.editName(users.otherValidUser.name)
        await profileData.saveChanges()
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
    },
    );

});

test('deve alterar o Estado e a Cidade do usuário com sucesso', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")
    },
    );
    await retryOnReload(page, async () => {

        await profileData.editStateAndCity(users.addresses[0].state, users.addresses[0].city)
        await profileData.saveChanges()
    },
    );

    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editStateAndCity(users.addresses[1].state, users.addresses[1].city)
        await profileData.saveChanges()
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")

    },
    );

});

test('deve alterar a Data de Nascimento do usuário com sucesso', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

    },
    );
    await retryOnReload(page, async () => {

        await profileData.editDateOfBirth(users.dateOfBirth.validDate)
        await profileData.saveChanges()
    },
    );

    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editDateOfBirth(users.dateOfBirth.otherValiDate)
        await profileData.saveChanges()

        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
    },
    );
});

test('deve alterar o Telefone do usuário com sucesso', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

    },
    );
    await retryOnReload(page, async () => {

        await profileData.editPhoneNumber(users.phone.validPhone)
        await profileData.saveChanges()
    },
    );

    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editPhoneNumber(users.phone.otherValidPhone)
        await profileData.saveChanges()

        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
    },
    );
});

test('deve alterar o Curso Almejado do usuário com sucesso', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

    },
    );
    await retryOnReload(page, async () => {

        await profileData.editDesiredCourse("MBA","Graduação")
        await profileData.saveChanges()
    },
    );

    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editDesiredCourse('MBA','Graduação')
        await profileData.saveChanges()

        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
    },
    );
});

test('deve tentar salvar alterações sem preencher o campo de Nome Completo', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editName('')
        await profileData.saveChanges()
        await ErrorHandler.expectFieldError(page, 'Nome Completo', 'O nome é obrigatório');

    },
    );

});

test.only('deve tentar salvar alterações sem selecionar o Estado e Cidade', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

        await profileData.editStateAndCity('-- Selecione o estado --', '-- Selecione a cidade --')
        await profileData.saveChanges()
        await expect(page.getByText('Obrigatório').first()).toBeVisible();
        await expect(page.getByText('Obrigatório').nth(1)).toBeVisible();
    },
    );
});

test('deve tentar salvar alterações sem selecionar a Data de Nascimento', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

    },
    );
    await retryOnReload(page, async () => {

        await profileData.editDateOfBirth(" ")
        await profileData.saveChanges()
        await ErrorHandler.expectFieldError(page, 'Data Nascimento', 'A data de nascimento é obrigatória');

    },
    );

});

test('deve tentar salvar as alterações selecionando uma data de nascimento que indique idade inferior a 10 anos', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

    },
    );
    await retryOnReload(page, async () => {
        await profileData.editDateOfBirth(users.dateOfBirth.wrongDate)
        await profileData.saveChanges()
        await ErrorHandler.expectFieldError(page, 'Data Nascimento', 'Menores de 10 anos não podem utilizar a plataforma');

    },
    );
});

test('deve tentar salvar as alterações selecionando uma Data de Nascimento futura', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editDateOfBirth(users.dateOfBirth.futureDate)
        await profileData.saveChanges()
        await ErrorHandler.expectFieldError(page, 'Data Nascimento', 'Data de nascimento inválida');

    },
    );
});

test('deve tentar salvar alterações sem selecionar o Telefone', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPhoneNumber(" ")
        await profileData.saveChanges()
        await ErrorHandler.expectFieldError(page, 'Telefone', 'O telefone é obrigatório');

    },
    );
});

test('deve tentar salvar alterações sem preencher o campo de Telefone corretamente', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPhoneNumber(users.phone.invalidPhone)
        await profileData.saveChanges()
        await ErrorHandler.expectFieldError(page, 'Telefone', 'Telefone inválido');

    },
    );
});

test('deve tentar salvar alterações sem selecionar a Área de Interesse', async ({page}) => {
    // esse teste há ocorrência de bug
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

    },
    );
    await retryOnReload(page, async () => {
        await profileData.editMainGoal('Outro');
        await profileData.saveChanges()
        await AlertHandler.expectAlertMessage(page, "É obrigatório o preenchimento de todos os campos")
    },
    );
});

test('deve alterar a senha do usuário com sucesso', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );

    await retryOnReload(page, async () => {

        await profileData.editPassword(users.otherValidUser.password)
        await profileData.editNewPassword('NovaSenha256')
        await profileData.editConfirmPassword('NovaSenha256')
        await profileData.saveInfo()
    },
    );
    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Senha alterada com sucesso!")
        await login.Logout()

    },
    );
    await retryOnReload(page, async () => {
        await login.login(users.otherValidUser.email,'NovaSenha256');
        await login.IsLoggedIn(users.otherValidUser.name)
    },
    );

    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );

    await retryOnReload(page, async () => {

        await profileData.editPassword('NovaSenha256')
        await profileData.editNewPassword(users.otherValidUser.password)
        await profileData.editConfirmPassword(users.otherValidUser.password)
        await profileData.saveInfo()
    },
    );
    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Senha alterada com sucesso!")
        await page.waitForTimeout(6000);
        await login.Logout()
    },
    );
    await retryOnReload(page, async () => { 
        await login.login(users.otherValidUser.email,users.otherValidUser.password );
        await login.IsLoggedIn(users.otherValidUser.name)
    },
    );
});

test.only('deve tentar alterar a senha do usuário sem preencher o campo de Senha Atual', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
  
        await profileData.editNewPassword('NovaSenha256')
        await profileData.editConfirmPassword('NovaSenha256')
        await profileData.saveInfo()
        await ErrorHandler.expectFieldError(page, 'Senha atual', 'A senha é obrigatória!');
    },
    );
});

test.only('deve tentar alterar a senha do usuário sem preencher o campo de Nova Senha', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword('NovaSenha256')
        await profileData.editConfirmPassword('NovaSenha256')
        await profileData.saveInfo()
        await ErrorHandler.expectFieldError(page, 'Nova senha', 'A senha é obrigatória!');
    },
    );
});

test.only('deve tentar alterar a senha do usuário sem preencher o campo de Confirmar Senha', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword('NovaSenha256')
        await profileData.editNewPassword('NovaSenha256')

        await profileData.saveInfo()
        await ErrorHandler.expectFieldError(page, 'Confirmar Senha', 'Digite a nova senha novamente');
    },
    );
});

test.only('deve tentar alterar a senha do usuário sem preencher o campo de Senha Atual com a senha atual correta', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {

        await profileData.editPassword('SENHAnova1234')
        await profileData.editNewPassword('NovaSenha256')
        await profileData.editConfirmPassword('NovaSenha256')

        await profileData.saveInfo()
        await AlertHandler.expectAlertMessage(page, "Senha atual inválida!")

    },
    );
});

test.only('deve tentar alterar a senha do usuário sem preencher o campo de Nova Senha com uma senha diferente da senha atual', async ({page}) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")

    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword(users.otherValidUser.password)
        await profileData.editNewPassword(users.otherValidUser.password)
        await profileData.editConfirmPassword(users.otherValidUser.password)

        await profileData.saveInfo()
        await AlertHandler.expectAlertMessage(page, "A senha nova não pode ser igual à atual!")

    },
    );
});

test.only('deve tentar alterar a senha do usuário sem preencher o campo de Confirmar Senha com a mesma informação preenchida no campo Nova Senha', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword('SENHAnova1234')
        await profileData.editNewPassword('NovaSenha256')
        await profileData.editConfirmPassword('NovaSenha25622')

        await profileData.saveInfo()
        await ErrorHandler.expectFieldError(page, 'Confirmar Senha', 'As senhas devem ser iguais!');
    },
    );
});

test.only('deve tentar alterar a senha do usuário com menos de 6 caracteres', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword('SENHAnova1234')
        await profileData.editNewPassword('163')
        await profileData.editConfirmPassword('163')

        await profileData.saveInfo()
        await ErrorHandler.expectFieldError(page, 'Nova senha', 'Sua senha precisa conter no minímo 6 caracteres!');
    },
    );
});

test.only('deve tentar alterar a senha do usuário sem letras minúsculas', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {

        await profileData.editPassword('SENHAnova1234')
        await profileData.editNewPassword('NOVASENHA145')
        await profileData.editConfirmPassword('NOVASENHA145')

        await profileData.saveInfo()
        await AlertHandler.expectAlertMessage(page, "A senha deve conter pelo menos uma letra minúscula.")
    },
    );
});

test.only('deve tentar alterar a senha do usuário sem letras maiúsculas', async ({ page }) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword('SENHAnova1234')
        await profileData.editNewPassword('novasenha145')
        await profileData.editConfirmPassword('novasenha145')

        await profileData.saveInfo()
        await AlertHandler.expectAlertMessage(page, "A senha deve conter pelo menos uma letra maiúscula.")
    },
    );
});

test.only('deve tentar alterar a senha do usuário com 3 ou mais caracteres consecutivos', async ({page}) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword('SENHAnova1234')
        await profileData.editNewPassword('NovaSenha12345')
        await profileData.editConfirmPassword('NovaSenha12345')

        await profileData.saveInfo()
        await AlertHandler.expectAlertMessage(page, "A senha não pode conter sequências de 3 ou mais caracteres consecutivos.")
    },
    );
});

test.only('deve tentar alterar a senha do usuário com mais de 30 caracteres', async ({page}) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Alterar senha")
    },
    );
    await retryOnReload(page, async () => {
        await profileData.editPassword('SENHAnova1234')
        await profileData.editNewPassword('vQmRkTzLpWnXhJcYfGdNsUaPeBxKjHrM')
        await profileData.editConfirmPassword('vQmRkTzLpWnXhJcYfGdNsUaPeBxKjHrM')

        await profileData.saveInfo()
        await ErrorHandler.expectFieldError(page, 'Nova senha', 'Sua senha pode conter no máximo 30 caracteres');
    },
    );
});
