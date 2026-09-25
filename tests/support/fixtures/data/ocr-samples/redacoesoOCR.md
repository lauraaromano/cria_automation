# Massa de teste — imagens para OCR

Esta pasta guarda as imagens de redações manuscritas/digitalizadas usadas nos
testes de "Digitalizar redação". **Nenhuma imagem aqui é versionada no Git** —
apenas essa documentação e a estrutura de pastas.

## Como adicionar suas imagens

Coloque os arquivos (`.png`, `.jpg`, `.jpeg`) na subpasta correspondente:

| Pasta                    | Conteúdo esperado                                      |
|---------------------------|---------------------------------------------------------|
| `boa-qualidade/`          | Redação legível, sem rasuras                            |
| `ma-qualidade/`            | Foto de baixa qualidade (borrada, mal iluminada, etc.)  |
| `manuscrita/`              | Redação escrita à mão                                   |
| `letra-forma/`             | Redação em letra de forma                               |
| `letra-grande/`            | Letra grande                                             |
| `letra-pequena/`           | Letra pequena                                             |
| `dificil-compreensao/`     | Letra difícil de ler                                     |
| `rasurada/`                | Redação com termos rasurados                             |

Você pode adicionar mais de uma imagem por pasta — os testes escolhem uma
aleatoriamente entre os arquivos presentes.

## Usando uma pasta externa ao repositório

Se preferir manter essas imagens totalmente fora do projeto (por exemplo, numa
pasta compartilhada da equipe), configure `TEST_OCR_SAMPLES_DIR` no seu `.env`
apontando para o caminho absoluto dessa pasta externa, mantendo a mesma
estrutura de subpastas listada acima.