# Casos de Teste — Login

## TC01 — Realizar login com credenciais válidas

**Pré-requisito:**

* Usuário cadastrado.
* Usuário possui credenciais válidas.

**Passos:**

1. Acessar a tela de login.
2. Informar um e-mail válido.
3. Informar uma senha válida.
4. Realizar o login.
5. Validar que o usuário está autenticado.

**Resultado esperado:**

* A tela de login é exibida corretamente.
* Os dados informados são aceitos.
* O sistema autentica o usuário com sucesso.
* O usuário é direcionado para a área autenticada da aplicação.

## TC02 — Tentar realizar login com os campos de e-mail e senha vazios

**Pré-requisito:**

* Usuário está na tela de login.

**Passos:**

1. Manter o campo de e-mail vazio.
2. Manter o campo de senha vazio.
3. Tentar realizar o login.

**Resultado esperado:**

* O sistema não realiza a autenticação.
* O campo de e-mail apresenta a mensagem **"Obrigatório"**.
* O campo de senha apresenta a mensagem **"Obrigatório"**.

## TC03 — Tentar realizar login com e-mail válido e senha inválida

**Pré-requisito:**

* Usuário possui um e-mail válido.
* Usuário possui uma senha inválida para teste.

**Passos:**

1. Acessar a tela de login.
2. Informar um e-mail válido.
3. Informar uma senha inválida.
4. Realizar o login.

**Resultado esperado:**

* O sistema não realiza a autenticação.
* O sistema apresenta a mensagem **"Senha inválida!"**.

## TC04 — Tentar realizar login com usuário inválido e senha válida

**Pré-requisito:**

* Usuário/e-mail inválido disponível para teste.
* Senha válida disponível para teste.

**Passos:**

1. Acessar a tela de login.
2. Informar um e-mail inválido.
3. Informar uma senha válida.
4. Realizar o login.

**Resultado esperado:**

* O sistema não realiza a autenticação.
* O sistema apresenta a mensagem **"Usuário não encontrado!"**.

## TC05 — Tentar realizar login com o campo de usuário vazio

**Pré-requisito:**

* Usuário está na tela de login.
* Uma senha válida está disponível para teste.

**Passos:**

1. Manter o campo de e-mail vazio.
2. Informar uma senha válida.
3. Tentar realizar o login.

**Resultado esperado:**

* O sistema não realiza a autenticação.
* O campo de e-mail apresenta a mensagem **"Obrigatório"**.

## TC06 — Tentar realizar login com o campo de senha vazio

**Pré-requisito:**

* Usuário está na tela de login.
* Um e-mail válido está disponível para teste.

**Passos:**

1. Informar um e-mail válido.
2. Manter o campo de senha vazio.
3. Tentar realizar o login.

**Resultado esperado:**

* O sistema não realiza a autenticação.
* O campo de senha apresenta a mensagem **"Obrigatório"**.
