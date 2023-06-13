# 💡 Monitoramento de consumo de energia elétrica
Este é um programa em Typescript que permite monitorar o consumo de energia elétrica de uma casa. O programa é capaz de coletar informações sobre o uso de energia de vários aparelhos elétricos e realizar análises de consumo dos aparelhos em uma faixa de 10 horas (10 leituras).

## 🔐 NOVO: Criptografia
Agora, os dados da classe Aparelho são criptografados antes de serem enviados para a Main (Nuvem).

No arquivo `src/assets/ventoinha-pc.mp3`, há um áudio de uma ventoinha de um computador. Esse áudio gera naturalmente uma sequência de bytes aleatórios (**fonte de aleatoriedade real**), e a partir dessa sequência de bytes é gerado uma senha. Essa senha, também conhecido como hash, é utilizado para criptografar cada objeto do tipo Aparelho.

Por fim, na classe Main, esses objetos são descriptografados e as funções de impressão dos objetos são chamadas normalmente.

Observação: Diferentemente da segunda e primeira avaliação, os métodos de impressão estão agora na classe Main, e não mais na classe MonitoramentoController. Essa alteração foi feita para comprovar que os objetos estão sendo descriptografados na Main, pois não faria sentido criptografá-los e descriptografá-los na mesma classe (MonitoramentoController).

## ✍️ Análise das complexidades
### Antes (verificar branch `segunda-avaliacao`)
Nuvem: O(n * m) -> Borda: O(1)
### Depois (cenário atual)
Nuvem: O(1) -> Borda: O(n)

## 💻 Pré-requisitos
Para utilizar este programa, é necessário possuir:
 - Node.js versão 16 ou superior instalado.


## 📶 Funcionalidades
O programa oferece as seguintes funcionalidades:

- Geração de dados de consumo de energia elétrica de vários aparelhos em uma casa;
- Leitura dos aparelhos gerados
- Leitura e ordenação das leituras geradas para cada aparelho
- Leitura e ordenação das leituras geradas para cada aparelho por ordem crescente
- Leitura e calculo total de Watts gastos no tempo de leitura

## 📁 Estrutura do projeto
O projeto está organizado da seguinte forma:
- /src &rarr classe Main e pastas ``` assets ```, ``` controllers ```, ``` models ``` e ``` utils ```
- /src/assets &rarr; Contém um arquivo JSON utilizado como banco de dados. O arquivo em questão contém 27 objetos e em cada objeto o nome, tipo, potência mínima e potência máxima do eletrodoméstico
- /src/controllers &rarr; Contém as classes Aparelho e Monitoramento
- /src/models &rarr; Contém as interfaces do programa.
- /src/utils &rarr; Contém um arquivo com uma funcionalidade extra, relativa ao mini-mundo escolhido, com complexidade O(N^3) (cúbica) e o algoritimo ordenarCrescente que simula a função ```sort``` nativa do Javascript

## ⌨️ Instalação
Para instalar a aplicação, siga os seguintes passos:

1. Clone o repositório:

```bash
git clone -b segunda-avaliacao https://github.com/alissonfr/monitoramento_energia.git
```

2. Entre na pasta dos projetos e instale as dependências de ambos:
```bash
cd monitoramento_energia/cenario.1
npm install

cd monitoramento_energia/cenario.2
npm install
```

3. Inicie qualquer um dos programas com o comando:
```bash
npm start
```

## 📖 Sites utilizados para a pesquisa

https://medium.com/@erichnyaga1/the-big-o-notation-in-typescript-7f0a0221969d

https://www.crowdstrike.com/cybersecurity-101/brute-force-attacks/