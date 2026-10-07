# Casos de Teste — ProfileData

## TC01 — Alterar o Nome Completo do usuário com sucesso

**Pré-requisito:**

* Usuário cadastrado.
* Usuário possui credenciais válidas.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Informar um novo Nome Completo válido.
4. Salvar as alterações.
5. Validar a mensagem de sucesso.
6. Alterar o Nome Completo novamente para o nome original.
7. Salvar as alterações.

**Resultado esperado:**

* A área de dados do usuário é exibida corretamente.
* O novo Nome Completo é aceito.
* O sistema salva as alterações com sucesso.
* O sistema apresenta a mensagem **"Dados alterados com sucesso!"**.
* O Nome Completo pode ser alterado novamente para o valor original.

---

## TC02 — Alterar o Estado e a Cidade do usuário com sucesso

**Pré-requisito:**

* Usuário cadastrado.
* Usuário possui credenciais válidas.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Selecionar um Estado válido.
4. Selecionar uma Cidade válida correspondente ao Estado.
5. Salvar as alterações.
6. Validar a mensagem de sucesso.
7. Alterar o Estado e a Cidade novamente para outros valores válidos.
8. Salvar as alterações.

**Resultado esperado:**

* O Estado selecionado é aceito.
* A Cidade correspondente ao Estado selecionado é aceita.
* O sistema salva as alterações com sucesso.
* O sistema apresenta a mensagem **"Dados alterados com sucesso!"**.
* O Estado e a Cidade podem ser alterados novamente para outros valores válidos.

---

## TC03 — Alterar a Data de Nascimento do usuário com sucesso

**Pré-requisito:**

* Usuário cadastrado.
* Usuário possui credenciais válidas.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Informar uma Data de Nascimento válida.
4. Salvar as alterações.
5. Validar a mensagem de sucesso.
6. Alterar a Data de Nascimento novamente para outra data válida.
7. Salvar as alterações.

**Resultado esperado:**

* A Data de Nascimento informada é aceita.
* O sistema salva as alterações com sucesso.
* O sistema apresenta a mensagem **"Dados alterados com sucesso!"**.
* A Data de Nascimento pode ser alterada novamente para outra data válida.

---

## TC04 — Alterar o Telefone do usuário com sucesso

**Pré-requisito:**

* Usuário cadastrado.
* Usuário possui credenciais válidas.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Informar um número de telefone válido.
4. Salvar as alterações.
5. Validar a mensagem de sucesso.
6. Alterar o telefone novamente para outro número válido.
7. Salvar as alterações.

**Resultado esperado:**

* O telefone informado é aceito.
* O sistema salva as alterações com sucesso.
* O sistema apresenta a mensagem **"Dados alterados com sucesso!"**.
* O telefone pode ser alterado novamente para outro número válido.

---

## TC05 — Alterar o Curso Almejado do usuário com sucesso

**Pré-requisito:**

* Usuário cadastrado.
* Usuário possui credenciais válidas.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Selecionar um Curso Almejado válido.
4. Salvar as alterações.
5. Validar a mensagem de sucesso.
6. Alterar o Curso Almejado novamente para outro curso válido.
7. Salvar as alterações.

**Resultado esperado:**

* O Curso Almejado selecionado é aceito.
* O sistema salva as alterações com sucesso.
* O sistema apresenta a mensagem **"Dados alterados com sucesso!"**.
* O Curso Almejado pode ser alterado novamente para outro curso válido.

---

## TC06 — Tentar salvar alterações sem preencher o campo de Nome Completo

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Manter o campo de Nome Completo vazio.
4. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O campo **"Nome Completo"** apresenta a mensagem **"O nome é obrigatório"**.

---

## TC07 — Tentar salvar alterações sem selecionar o Estado e a Cidade

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Não selecionar nenhum Estado.
4. Não selecionar nenhuma Cidade.
5. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O campo **"Estado"** apresenta a mensagem **"Obrigatório"**.
* O campo **"Cidade"** apresenta a mensagem **"Obrigatório"**.

---

## TC08 — Tentar salvar alterações sem selecionar a Data de Nascimento

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Manter o campo de Data de Nascimento vazio.
4. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O campo **"Data Nascimento"** apresenta a mensagem **"A data de nascimento é obrigatória"**.

---

## TC09 — Tentar salvar as alterações selecionando uma Data de Nascimento que indique idade inferior a 10 anos

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma Data de Nascimento que indique idade inferior a 10 anos está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Informar uma Data de Nascimento que indique idade inferior a 10 anos.
4. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O campo **"Data Nascimento"** apresenta a mensagem **"Menores de 10 anos não podem utilizar a plataforma"**.

---

## TC10 — Tentar salvar as alterações selecionando uma Data de Nascimento futura

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma Data de Nascimento futura está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Informar uma Data de Nascimento futura.
4. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O campo **"Data Nascimento"** apresenta a mensagem **"Data de nascimento inválida"**.

---

## TC11 — Tentar salvar alterações sem selecionar o Telefone

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Manter o campo de Telefone vazio.
4. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O campo **"Telefone"** apresenta a mensagem **"O telefone é obrigatório"**.

---

## TC12 — Tentar salvar alterações sem preencher o campo de Telefone corretamente

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Um número de telefone inválido está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Informar um número de telefone inválido.
4. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O campo **"Telefone"** apresenta a mensagem **"Telefone inválido"**.

---

## TC13 — Tentar salvar alterações sem selecionar a Área de Interesse

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* O cenário **"Outro"** está disponível na Área de Interesse.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Meus dados"**.
3. Selecionar **"Outro"** na Área de Interesse.
4. Tentar salvar as alterações.

**Resultado esperado:**

* O sistema não salva as alterações.
* O sistema apresenta a mensagem **"É obrigatório o preenchimento de todos os campos"**.

---

## TC14 — Alterar a senha do usuário com sucesso

**Pré-requisito:**

* Usuário cadastrado.
* Usuário possui credenciais válidas.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual correta.
4. Informar uma nova senha válida.
5. Confirmar a nova senha.
6. Salvar as informações.
7. Validar a mensagem de sucesso.
8. Sair da aplicação.
9. Realizar login utilizando a nova senha.
10. Validar que o usuário foi autenticado com sucesso.
11. Acessar novamente a opção **"Alterar senha"**.
12. Informar a nova senha como senha atual.
13. Informar a senha original como nova senha.
14. Confirmar a nova senha.
15. Salvar as informações.

**Resultado esperado:**

* A senha atual correta é aceita.
* A nova senha é aceita.
* A confirmação da nova senha é aceita.
* O sistema altera a senha com sucesso.
* O sistema apresenta a mensagem **"Senha alterada com sucesso!"**.
* O usuário consegue realizar login utilizando a nova senha.
* O sistema permite alterar novamente a senha para a senha original.

---

## TC15 — Tentar alterar a senha do usuário sem preencher o campo de Senha Atual

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Manter o campo de Senha Atual vazio.
4. Informar uma Nova Senha válida.
5. Informar a confirmação da Nova Senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O campo **"Senha atual"** apresenta a mensagem **"A senha é obrigatória!"**.

---

## TC16 — Tentar alterar a senha do usuário sem preencher o campo de Nova Senha

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a Senha Atual.
4. Manter o campo de Nova Senha vazio.
5. Informar a confirmação da Nova Senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O campo **"Nova senha"** apresenta a mensagem **"A senha é obrigatória!"**.

---

## TC17 — Tentar alterar a senha do usuário sem preencher o campo de Confirmar Senha

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a Senha Atual.
4. Informar uma Nova Senha válida.
5. Manter o campo de Confirmar Senha vazio.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O campo **"Confirmar Senha"** apresenta a mensagem **"Digite a nova senha novamente"**.

---

## TC18 — Tentar alterar a senha do usuário sem preencher o campo de Senha Atual com a senha atual correta

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma senha diferente da senha atual está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar uma senha incorreta no campo de Senha Atual.
4. Informar uma Nova Senha válida.
5. Confirmar a Nova Senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O sistema apresenta a mensagem **"Senha atual inválida!"**.

---

## TC19 — Tentar alterar a senha do usuário utilizando uma Nova Senha igual à senha atual

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Usuário possui uma senha atual válida.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual correta.
4. Informar a mesma senha no campo de Nova Senha.
5. Informar a mesma senha no campo de Confirmar Senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O sistema apresenta a mensagem **"A senha nova não pode ser igual à atual!"**.

---

## TC20 — Tentar alterar a senha do usuário com informações diferentes nos campos Nova Senha e Confirmar Senha

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma senha atual válida está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual.
4. Informar uma nova senha.
5. Informar uma senha diferente no campo de Confirmar Senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O campo **"Confirmar Senha"** apresenta a mensagem **"As senhas devem ser iguais!"**.

---

## TC21 — Tentar alterar a senha do usuário com menos de 6 caracteres

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma senha com menos de 6 caracteres está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual.
4. Informar uma nova senha com menos de 6 caracteres.
5. Confirmar a nova senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O campo **"Nova senha"** apresenta a mensagem **"Sua senha precisa conter no minímo 6 caracteres!"**.

---

## TC22 — Tentar alterar a senha do usuário sem letras minúsculas

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma senha contendo apenas letras maiúsculas e outros caracteres está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual.
4. Informar uma nova senha sem letras minúsculas.
5. Confirmar a nova senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O sistema apresenta a mensagem **"A senha deve conter pelo menos uma letra minúscula."**.

---

## TC23 — Tentar alterar a senha do usuário sem letras maiúsculas

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma senha sem letras maiúsculas está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual.
4. Informar uma nova senha sem letras maiúsculas.
5. Confirmar a nova senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O sistema apresenta a mensagem **"A senha deve conter pelo menos uma letra maiúscula."**.

---

## TC24 — Tentar alterar a senha do usuário com 3 ou mais caracteres consecutivos

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma senha contendo uma sequência de 3 ou mais caracteres consecutivos está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual.
4. Informar uma nova senha contendo 3 ou mais caracteres consecutivos.
5. Confirmar a nova senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O sistema apresenta a mensagem **"A senha não pode conter sequências de 3 ou mais caracteres consecutivos."**.

---

## TC25 — Tentar alterar a senha do usuário com mais de 30 caracteres

**Pré-requisito:**

* Usuário cadastrado.
* Usuário está autenticado na aplicação.
* Uma senha com mais de 30 caracteres está disponível para teste.

**Passos:**

1. Acessar a área de dados do usuário.
2. Acessar a opção **"Alterar senha"**.
3. Informar a senha atual.
4. Informar uma nova senha com mais de 30 caracteres.
5. Confirmar a nova senha.
6. Tentar salvar as informações.

**Resultado esperado:**

* O sistema não altera a senha.
* O campo **"Nova senha"** apresenta a mensagem **"Sua senha pode conter no máximo 30 caracteres"**.
