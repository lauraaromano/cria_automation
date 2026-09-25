# Casos de Teste — Criação de Redação

## TC01 — Criar uma redação estilo Enem com sucesso

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar o vestibular "Enem".
3. Selecionar uma área.
4. Selecionar um dos temas retornados na filtragem.
5. Selecionar o tipo de texto "Dissertativo".
6. Selecionar o gênero textual "Dissertativo-argumentativo".
7. Clicar em "Criar Redação".

**Resultado esperado:**

* O vestibular "Enem" é aplicado como filtro corretamente.
* A área selecionada é aplicada como filtro corretamente.
* O tema selecionado é carregado.
* O tipo de texto "Dissertativo" e o gênero "Dissertativo-argumentativo" são aceitos, por ser a combinação exigida pelo Enem.
* A redação é criada com sucesso.

## TC02 — Criar uma redação com Outros Gêneros (Narrativo) com sucesso

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular diferente de "Enem".
3. Selecionar uma área.
4. Selecionar um dos temas retornados na filtragem.
5. Selecionar o tipo de texto "Narrativo".
6. Selecionar um gênero textual compatível com o tipo de texto "Narrativo".
7. Clicar em "Criar Redação".

**Resultado esperado:**

* O vestibular selecionado (diferente de Enem) é aplicado como filtro corretamente.
* A área selecionada é aplicada como filtro corretamente.
* O tema selecionado é carregado.
* O tipo de texto "Narrativo" e o gênero textual correspondente são aceitos.
* A redação é criada com sucesso.

## TC03 — Criar uma redação com Outros Gêneros (Dissertativo) com sucesso

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular diferente de "Enem".
3. Selecionar uma área.
4. Selecionar um dos temas retornados na filtragem.
5. Selecionar o tipo de texto "Dissertativo".
6. Selecionar um gênero textual compatível com o tipo de texto "Dissertativo" (diferente de argumentativo).
7. Clicar em "Criar Redação".

**Resultado esperado:**

* O vestibular selecionado (diferente de Enem) é aplicado como filtro corretamente.
* A área selecionada é aplicada como filtro corretamente.
* O tema selecionado é carregado.
* O tipo de texto "Dissertativo" e o gênero textual correspondente são aceitos.
* A redação é criada com sucesso.

## TC04 — Selecionar um tema de redação através da busca por palavra-chave de um tema existente

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um tema cadastrado com a palavra-chave utilizada na busca.

**Passos:**

1. Clicar em "Criar Redação".
2. Informar a palavra-chave "A linguagem neutra em debate no Brasil" no campo de busca.
3. Selecionar o tema retornado na busca.
4. Selecionar o tipo de texto "Narrativo".
5. Selecionar um gênero textual compatível com o tipo de texto "Narrativo".
6. Clicar em "Criar Redação".

**Resultado esperado:**

* A busca retorna o tema correspondente à palavra-chave informada.
* O tema é selecionado corretamente.
* O tipo de texto e o gênero textual são aceitos.
* A redação é criada com sucesso.

## TC05 — Buscar um tema de redação através de palavra-chave inexistente

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Não existe tema cadastrado com a palavra-chave utilizada na busca.

**Passos:**

1. Clicar em "Criar Redação".
2. Informar a palavra-chave "Os impactos do uso excessivo de telas no desenvolvimento cognitivo de crianças." no campo de busca.
3. Validar o resultado retornado pela busca.

**Resultado esperado:**

* O sistema não retorna nenhum tema correspondente.
* O resultado da busca é nulo/vazio.

## TC06 — Selecionar um vestibular existente como filtro

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe ao menos um vestibular cadastrado com temas disponíveis.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular existente como filtro.
3. Selecionar um tema aleatório a partir do resultado exibido.
4. Selecionar o tipo de texto "Dissertativo".
5. Selecionar um gênero textual compatível com o tipo de texto selecionado.
6. Clicar em "Criar Redação".

**Resultado esperado:**

* O filtro de vestibular é aplicado corretamente.
* Os temas exibidos correspondem ao vestibular selecionado.
* O tipo de texto e o gênero textual são aceitos.
* A redação é criada com sucesso.

## TC07 — Selecionar uma área existente como filtro

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe ao menos uma área de conhecimento cadastrada com temas disponíveis.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar uma área existente como filtro.
3. Selecionar um tema aleatório a partir do resultado exibido.
4. Selecionar o tipo de texto "Narrativo".
5. Selecionar um gênero textual compatível com o tipo de texto selecionado.
6. Clicar em "Criar Redação".

**Resultado esperado:**

* O filtro de área é aplicado corretamente.
* Os temas exibidos correspondem à área selecionada.
* O tipo de texto e o gênero textual são aceitos.
* A redação é criada com sucesso.

## TC08 — Selecionar uma área e um vestibular existentes como filtro

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe combinação válida de vestibular e área com temas disponíveis.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar um vestibular existente como filtro.
3. Selecionar uma área existente como filtro adicional.
4. Selecionar um tema aleatório a partir do resultado exibido.
5. Selecionar o tipo de texto "Narrativo".
6. Selecionar um gênero textual compatível com o tipo de texto selecionado.
7. Clicar em "Criar Redação".

**Resultado esperado:**

* Os filtros de vestibular e área são aplicados simultaneamente e de forma correta.
* Os temas exibidos correspondem à combinação de filtros selecionada.
* O tipo de texto e o gênero textual são aceitos.
* A redação é criada com sucesso.

## TC09 — Selecionar um tema de redação através de "Outros"

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existem temas disponíveis na página de "Outros".

**Passos:**

1. Clicar em "Criar Redação".
2. Acessar a página e scrollar até "Outros" temas e selecionar um tema aleatório disponível.
3. Selecionar o tipo de texto "Dissertativo".
4. Selecionar um gênero textual compatível com o tipo de texto selecionado.
5. Clicar em "Criar Redação".

**Resultado esperado:**

* A página de "Outros" temas é carregada corretamente.
* Um tema é selecionado com sucesso.
* O tipo de texto e o gênero textual são aceitos.
* A redação é criada com sucesso.

## TC10 — Selecionar um tema de redação através do "Tema da semana"

**Pré-requisito:**

* Usuário autenticado no sistema.
* Usuário está na tela de criação de redação.
* Existe um "Tema da semana" disponível.

**Passos:**

1. Clicar em "Criar Redação".
2. Selecionar o tema de redação do "Tema da semana".
3. Selecionar o tipo de texto "Narrativo".
4. Selecionar um gênero textual compatível com o tipo de texto selecionado.
5. Clicar em "Criar Redação".

**Resultado esperado:**

* O tema da semana é exibido e selecionado corretamente.
* O tipo de texto e o gênero textual são aceitos.
* A redação é criada com sucesso.