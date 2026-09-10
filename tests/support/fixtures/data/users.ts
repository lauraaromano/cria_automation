export const users = {
    valid: {
        name: process.env.TEST_USER_NAME as string,
        email: process.env.TEST_USER_EMAIL as string,
        password: process.env.TEST_USER_PASSWORD as string,
    },
    invalidEmail: {
        email: 'usuario.inexistente@teste.com',
    },
    invalidPassword: {
        password: 'SenhaErrada123',
    },
};