import { Aparelho } from "./controllers/AparelhoController";
import { Monitoramento } from "./controllers/MonitoramentoController";
import { ordenarCrescente } from "./utils/Ordenadores";
import crypto from "crypto-js"

class Main {
    constructor() { }

    /**
    * ##### Sobre:
    * O código apresentado cria uma instancia de Monitoramento, executa um loop que itera sobre 
    * os aparelhos na instância de "monitoramento" e são obtidas pelo método estático getAparelhos().
    * 
    * Para cada aparelho criptografado na lista, realiza as seguintes operações:
    *   a. Descriptografa o aparelho utilizando o algoritmo AES com o hash sendo retornado pelo método "getHash".
    *   b. Converte o resultado da descriptografia para uma string no formato UTF-8.
    *   c. Adiciona o objeto descriptografado à lista "aparelhosDescriptografados".
    * 
    * Após isso, são chamado os métodos para a impressão dos aparelhos.
    * 
    * ##### Complexidade:
    * A complexidade desse código é O(n), onde n é o número de elementos no array aparelhosCriptografados.
    */
    public static async main() {
        const monitoramento = new Monitoramento(10);

        try {
            
            await monitoramento.iniciarMonitoramento();
            setTimeout(() => {
                setInterval(async () => {
                    const aparelhosCriptografados = await monitoramento.getAparelhos();
        
                    const aparelhosDescriptografados: any = [];
                    for (let i = 0; i < aparelhosCriptografados.length; i++) {
                        const aparelhoCriptografado = aparelhosCriptografados[i];
                        const aparelhoDescriptografado = crypto.AES.decrypt(aparelhoCriptografado, monitoramento.getHash()).toString(crypto.enc.Utf8);
                        aparelhosDescriptografados.push(JSON.parse(aparelhoDescriptografado));
                    }

                    this.imprimirAparelhos(aparelhosDescriptografados);
                    this.imprimirLeituraAparelhos(aparelhosDescriptografados);
                    this.imprimirLeituraAparelhosCrescente(aparelhosDescriptografados);
                    this.encontrarMaiorDiferenca(aparelhosDescriptografados);
                }, 2000);
            }, 3000);

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // MÉTODOS PARA IMPRIMIR OS VALORES LIDOS

    /**
    * ##### Sobre:
    * Função simples que imprime uma tabela de dados na saída 
    * do console, e portanto, a sua complexidade não depende do tamanho dos dados, 
    * 
    * ##### Complexidade:
    * Por ser uma função simples que apenas imprime uma tabela de dados na saída 
    * do console, sua complexidade não depende do tamanho dos dados.
    */
    private static imprimirAparelhos(aparelhos: Aparelho[]): void {
        console.log("(d.1) Lista de aparelhos monitorados:");
        console.table(aparelhos, ['id', 'nome', 'tipo']);
        console.log('----------------------------------------------------------------');
    }

    /**
    * ##### Sobre:
    * Função para exibir os aparelhos
    * 
    * ##### Complexidade:
    * A complexidade desta função é O(n) (linear), onde n é o número de aparelhos na lista. Isso ocorre porque o 
    * algoritmo itera pela lista de aparelhos uma vez e, para cada aparelho, imprime seu array de leituras
    * Portanto, se a entrada de dados for muito grande, o tempo de execução do algoritmo também aumentará proporcionalmente, 
    * o que pode levar a um tempo de processamento significativo.
    */
    private static imprimirLeituraAparelhos(aparelhos: Aparelho[]): void {
        console.log('(d.2) Lista das leituras por aparelho monitorado');
        for (let i = 0; i < aparelhos.length; i++) {
            const aparelho = aparelhos[i];
            console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`);
        }
        console.log('----------------------------------------------------------------');
    }

    /**
    * ##### Sobre:
    * Função para ordenar e exibir os aparelhos por número de leituras na ordem crescente
    * 
    * ##### Complexidade:
    * A complexidade desta função é O(n^2) (quadrática), onde n é o número de aparelhos na lista. Isso ocorre porque a função ordenarCrescente() é 
    * chamado primeiro, que possui uma complexidade O(n^2). Em seguida, o algoritmo itera sobre a lista ordenada uma vez para imprimir as 
    * leituras de cada aparelho.
    */
    private static imprimirLeituraAparelhosCrescente(aparelhos: Aparelho[]): void {
        const aparelhosOrdenados = ordenarCrescente(aparelhos);
        console.log('(d.3) Lista das leituras por aparelho monitorado ordenados por ordem crescente');
        for (let i = 0; i < aparelhosOrdenados.length; i++) {
            const aparelho = aparelhosOrdenados[i];
            console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`);
        }
        console.log('----------------------------------------------------------------');
    }

    /**
    * ##### Sobre:
    * A função encontra a maior diferença absoluta entre todas as combinações possíveis de duas leituras do mesmo aparelho, 
    * e retorna o nome do aparelho correspondente e o valor dessa maior diferença. O algoritmo consiste em dois loops aninhados
    *  que iteram sobre as leituras de cada aparelho. Para cada aparelho, as diferenças absolutas entre cada par de leituras são 
    * calculadas e verificadas se são maiores do que a maior diferença encontrada até agora. Se a diferença calculada for maior, 
    * a maior diferença é atualizada e o nome do aparelho correspondente é armazenado. Ao final da iteração de todos os 
    * aparelhos e suas leituras, o nome do aparelho com a maior diferença e o valor dessa diferença são impressos na tela.
    * 
    * ##### Complexidade:
    * A complexidade desse algoritmo é O(n^3), pois existem três loops aninhados, um para iterar sobre os 
    * aparelhos, outro para iterar sobre as leituras de cada aparelho, e um terceiro para comparar cada par 
    * de leituras. 
    * À medida que a lista de aparelhos aumenta em tamanho, a complexidade aumenta exponencialmente, 
    * o que pode tornar o algoritmo ineficiente para listas muito grandes.
    * 
    * ##### É possível que o algoritmo gere alguma situação de necessidade de processamento via brute force?
    * Sim, a função utiliza três loops aninhados, sendo dois loops para iterar sobre as leituras do aparelho e um terceiro 
    * loop aninhado para calcular todas as diferenças possíveis entre as leituras. Portanto, a função tem uma complexidade cúbica, 
    * onde n é o número total de leituras entre todos os aparelhos. Esse tipo de algoritmo acaba gerando um brute force, pois 
    * testa todas as possibilidades de uma solução sem utilizar nenhum tipo de otimização.
    * 
    */
    private static encontrarMaiorDiferenca(aparelhos: Aparelho[]): void {
        const n = aparelhos.length;
        let maiorDiferenca = 0;
        let nomeAparelhoMaiorDiferenca = '';

        for (let i = 0; i < n; i++) {
            const aparelho = aparelhos[i];
            const leituras = aparelho.leituras;
            const m = leituras.length;

            for (let j = 0; j < m; j++) {
                for (let k = j + 1; k < m; k++) {
                    const diferenca = Math.abs(leituras[j] - leituras[k]);
                    if (diferenca > maiorDiferenca) {
                        maiorDiferenca = diferenca;
                        nomeAparelhoMaiorDiferenca = aparelho.nome;
                    }
                }
            }
        }
        console.log('(d.4) Maior diferença entre as leituras de todos os aparelhos:');
        console.log(`Aparelho com maior diferença: ${nomeAparelhoMaiorDiferenca}`);
        console.log(`Maior diferença: ${maiorDiferenca}`);
        console.log('----------------------------------------------------------------');
    }
}

Main.main();