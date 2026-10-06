export const users = {
    valid: {
        name: process.env.TEST_USER_NAME as string,
        email: process.env.TEST_USER_EMAIL as string,
        password: process.env.TEST_USER_PASSWORD as string,
    },

    otherValidUser: {
        name: process.env.TEST_USER_NAME2 as string,
        email: process.env.TEST_USER_EMAIL2 as string,
        password: process.env.TEST_USER_PASSWORD2 as string,
    },

    invalidEmail: {
        email: 'usuario.inexistente@teste.com',
    },

    invalidPassword: {
        password: 'SenhaErrada123',
    },

    nameChanged: {
        name: 'Changed Name',
    },

    addresses: [
        {
            state: 'Bahia',
            city: 'Abaré',
        },
        {
            state: 'Rio Grande do Sul',
            city: 'Aceguá',
        },
    ],

    dateOfBirth: {
        validDate: '2000-04-12',
        otherValiDate: '2001-01-22',
        wrongDate: '2020-04-12',
        futureDate: '2030-02-22',
    },
    phone: {
        validPhone: '11987654321',
        otherValidPhone: '13987654000',
        invalidPhone: '123'
    }
};