import { test, users, Login, ErrorHandler, AlertHandler, ProfileData, retryOnReload } from '../../support';

test.setTimeout(0);


let login: Login;
let profileData: ProfileData;

test.beforeEach(async ({ page }) => {
    login = new Login(page);
    profileData = new ProfileData(page)
    await login.login(users.valid.email, users.valid.password);
    await login.IsLoggedIn();
});

test('deve alterar o Nome Completo do usuário com sucesso', async ({page}) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editName(users.nameChanged.name)
        await profileData.saveChanges()
    },
    );
    
    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editName(users.valid.name)
        await profileData.saveChanges()
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")

    },
    );
   
});

test('deve alterar o Estado e a Cidade do usuário com sucesso', async ({page}) => {
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

test('deve alterar a Data de Nascimento do usuário com sucesso', async ({page}) => {
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

test('deve alterar o Telefone do usuário com sucesso', async ({page}) => {
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

test('deve alterar o Curso Almejado do usuário com sucesso', async ({page}) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")

    },
    );
    await retryOnReload(page, async () => {
        
        await profileData.editDesiredCourse("Ciências da Computação")   
        await profileData.saveChanges()
    },
    );

    await retryOnReload(page, async () => {
        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editDesiredCourse("Nutrição")   
        await profileData.saveChanges()

        await AlertHandler.expectAlertMessage(page, "Dados alterados com sucesso!")
    },
    );
});

test('deve tentar salvar alterações sem preencher o campo de Nome Completo', async ({page}) => {
    await retryOnReload(page, async () => {
        await profileData.myData();
        await profileData.editMyData("Meus dados")
    },
    );

    await retryOnReload(page, async () => {
        await profileData.editName('')
        await profileData.saveChanges()
    },
    );
    
    await retryOnReload(page, async () => {
        await ErrorHandler.expectFieldError(page, 'Nome Completo', 'O nome é obrigatório');
        await profileData.editMyData("Meus dados")
    },
    );

});

// test('deve tentar salvar alterações sem selecionar o Estado e Cidade', async () => {

// });

// test('deve tentar salvar alterações sem selecionar a Data de Nascimento', async () => {

// });

// test('deve tentar salvar as alterações selecionando uma data de nascimento que indique idade inferior a 10 anos ', async () => {

// });

// test('deve tentar salvar as alterações selecionando uma Data de Nascimento futura (posterior à data atual)', async () => {

// });

// test('deve tentar salvar alterações sem selecionar o Telefone', async () => {

// });

// test('deve tentar salvar alterações sem preencher o campo de Telefone corretamente', async () => {

// });

// test('deve tentar salvar alterações sem selecionar a Área de Interesse ', async () => {

// });

// test('deve alterar a senha do usuário com sucesso', async () => {

// });

// test('deve tentar alterar a senha do usuário sem preencher o campo de Senha Atual', async () => {

// });

// test('deve tentar alterar a senha do usuário sem preencher o campo de Nova Senha', async () => {

// });

// test('deve tentar alterar a senha do usuário sem preencher o campo de Confirmar Senha', async () => {

// });

// test('deve tentar alterar a senha do usuário sem preencher o campo de Senha Atual com a senha atual correta', async () => {

// });

// test('deve tentar alterar a senha do usuário sem preencher o campo de Nova Senha com uma senha diferente da senha atual', async () => {

// });

// test('deve tentar alterar a senha do usuário sem preencher o campo de Confirmar Senha com a mesma informação preenchida no campo Nova Senha', async () => {

// });

// test('deve tentar alterar a senha do usuário com menos de 6 caracteres', async () => {

// });
