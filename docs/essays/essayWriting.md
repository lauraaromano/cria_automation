# Casos de Teste — Escrita e Validação de Redação

## TC01 — Escrever uma redação estilo ENEM e enviar para correção com sucesso

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema disponível para o ENEM.
* Existe uma redação dissertativo-argumentativa válida para preenchimento.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar o vestibular "Enem".
3. Selecionar um tema disponível.
4. Selecionar o tipo de texto "Dissertativo".
5. Selecionar o gênero textual "Dissertativo-argumentativo".
6. Preencher o título da redação.
7. Preencher o texto da redação.
8. Clicar no botão de validação da redação por IA.

**Resultado esperado:**

* A redação é salva com sucesso.
* O sistema exibe a mensagem "Redação salva com sucesso".
* A redação é validada com sucesso.
* O sistema exibe a mensagem "Redação validada com sucesso".
* A redação é enviada para correção.


## TC02 — Escrever uma redação com menos de 600 caracteres e impedir o envio para correção

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema disponível para o ENEM.
* Existe uma redação com menos de 600 caracteres para teste.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar o vestibular "Enem".
3. Selecionar um tema disponível.
4. Selecionar o tipo de texto "Dissertativo".
5. Selecionar o gênero textual "Dissertativo-argumentativo".
6. Preencher o título da redação com uma redação inválida.
7. Preencher o texto com uma redação contendo menos de 600 caracteres.
8. Clicar no botão de validação da redação por IA.

**Resultado esperado:**

* A redação é salva com sucesso.
* O sistema exibe a mensagem "Redação salva com sucesso".
* A validação da redação é impedida.
* O sistema exibe a mensagem "Tamanho mínimo da redação não atingido, escreva pelo menos 600 caracteres!".
* A redação não é enviada para correção.


## TC03 — Tentar enviar uma redação sem conteúdo e impedir o envio para correção

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema disponível para redação.
* Os campos de título e texto estão vazios.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular disponível.
3. Selecionar um tema de redação disponível.
4. Selecionar o tipo de texto "Dissertativo".
5. Selecionar um gênero textual compatível.
6. Deixar o campo de título vazio.
7. Deixar o campo de texto vazio.
8. Clicar no botão de validação da redação por IA.

**Resultado esperado:**

* A redação é salva com sucesso.
* O sistema exibe a mensagem "Redação salva com sucesso".
* A validação da redação é impedida.
* O sistema exibe a mensagem "Tamanho mínimo da redação não atingido, escreva pelo menos 600 caracteres!".
* A redação não é enviada para correção.


## TC04 — Tentar enviar uma redação com idioma inapropriado e impedir o envio para correção

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema disponível para redação narrativa.
* Existe uma redação escrita em idioma inadequado para a validação.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular disponível.
3. Selecionar um tema de redação disponível.
4. Selecionar o tipo de texto "Narrativo".
5. Selecionar um gênero textual narrativo.
6. Preencher o título da redação.
7. Preencher o texto utilizando um idioma inadequado.
8. Clicar no botão de validação da redação por IA.

**Resultado esperado:**

* A redação é salva com sucesso.
* O sistema exibe a mensagem "Redação salva com sucesso".
* A validação da redação identifica o idioma inadequado.
* O sistema exibe a mensagem "Idioma inapropriado! Ocorrência:".
* A redação não é enviada para correção.


## TC05 — Escrever uma redação com texto aleatório ou sem sentido e impedir o envio para correção

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema disponível para redação dissertativo-argumentativa.
* Existe uma massa de teste contendo texto aleatório ou sem sentido.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular disponível.
3. Selecionar um tema de redação disponível.
4. Selecionar o tipo de texto "Dissertativo".
5. Selecionar o gênero textual "Dissertativo-argumentativo".
6. Preencher o título da redação.
7. Preencher o texto com conteúdo aleatório ou sem sentido.
8. Clicar no botão de validação da redação por IA.

**Resultado esperado:**

* A redação é salva com sucesso.
* O sistema exibe a mensagem "Redação salva com sucesso".
* A validação identifica que o conteúdo não corresponde ao formato esperado.
* O sistema exibe a mensagem "Seu texto não segue o formato de uma dissertação argumentativa válida. Revise a estrutura e o conteúdo".
* A redação não é enviada para correção.


## TC06 — Escrever uma redação com dois parágrafos iguais e impedir o envio para correção

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema disponível para redação narrativa.
* Existe uma redação contendo repetição de parágrafos para teste.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular disponível.
3. Selecionar um tema de redação disponível.
4. Selecionar o tipo de texto "Narrativo".
5. Selecionar um gênero textual narrativo.
6. Preencher o título da redação.
7. Preencher o texto contendo dois parágrafos iguais.
8. Clicar no botão de validação da redação por IA.

**Resultado esperado:**

* A redação é salva com sucesso.
* O sistema exibe a mensagem "Redação salva com sucesso".
* A validação identifica a repetição desnecessária de conteúdo.
* O sistema exibe a mensagem "Repetição de frases desnecessária! Ocorrência:".
* A redação não é enviada para correção.


## TC07 — Escrever uma redação de outros gêneros textuais e enviar para correção com sucesso

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema disponível para outros gêneros textuais.
* Existe uma redação válida do gênero textual selecionado.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular disponível.
3. Selecionar um tema de redação disponível.
4. Selecionar o tipo de texto "Narrativo".
5. Selecionar um gênero textual narrativo diferente dos gêneros utilizados nos testes anteriores.
6. Preencher o título da redação.
7. Preencher o texto da redação.
8. Clicar no botão de validação da redação por IA.

**Resultado esperado:**

* A redação é salva com sucesso.
* O sistema exibe a mensagem "Redação salva com sucesso".
* A redação é aceita pela validação.
* A redação é enviada para correção com sucesso.