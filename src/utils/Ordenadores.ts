import { AparelhoModel } from "../models/AparelhoModel";

    /**
    * ##### Sobre:
    * Função para somar as leituras de um aparelho. A função itera por todos os items do array de leituras e retorna
    * a soma de todos os itens do array. Ou seja, retorna a potencia total gastada no periodo
    * 
    * ##### Complexidade:
    * A complexidade deste algoritmo é O(n), onde n é o número de leituras no objeto aparelho. Isso ocorre 
    * porque o algoritmo itera através da lista de leituras uma vez e soma cada elemento.
    * Portanto, se a entrada de dados for muito grande, o tempo de execução do algoritmo também aumentará proporcionalmente, 
    * o que pode levar a um tempo de processamento significativo.
    */
    export function somarLeituras(aparelho: AparelhoModel): number {
        let soma = 0;
        for (let i = 0; i < aparelho.leituras.length; i++) {
            soma += aparelho.leituras[i];
        }
        return soma;
    }

    /**
    * ##### Sobre:
    * Função para ordenar os aparelhos por número de leituras crescente. Essa função utiliza o algoritimo de ordenação bubble sort e percorre
    * o array de aparelhos usando dois loops aninhados, comparando a soma das leituras do aparelho atual com a soma das leituras do próximo aparelho.
    * 
    * Se a soma das leituras do aparelho atual for maior do que a soma das leituras do próximo aparelho, os dois aparelhos 
    * são trocados de posição no array usando uma variável temp. Dessa forma, os aparelhos vão sendo ordenados em 
    * ordem crescente com base na soma das leituras.
    * 
    * Por fim, a função retorna o array de aparelhos ordenado. É importante notar que a função não faz nenhuma validação ou 
    * tratamento de erro para garantir que o parâmetro aparelhos seja um array válido de objetos.
    * 
    * ##### Complexidade:
    * A complexidade deste algoritmo de ordenação por seleção é O(n^2), onde n é o número de elementos na 
    * lista de aparelhos. Isso ocorre porque há um loop aninhado que compara cada elemento com todos os outros elementos da 
    * lista.
    * Por ter uma complexidade de O(n^2), onde n é o número de aparelhos na lista. Isso significa que, 
    * à medida que o tamanho da entrada aumenta, o tempo de execução do algoritmo cresce exponencialmente. Portanto, se 
    * a entrada de dados for muito grande, o tempo de execução do algoritmo pode ser muito longo e resultar em problemas de desempenho.
    */
    export function ordenarCrescente(aparelhos: AparelhoModel[]): AparelhoModel[] {
        for (let i = 0; i < aparelhos.length - 1; i++) {
            for (let j = i + 1; j < aparelhos.length; j++) {
                if (somarLeituras(aparelhos[i]) > somarLeituras(aparelhos[j])) {
                    const temp = aparelhos[i];
                    aparelhos[i] = aparelhos[j];
                    aparelhos[j] = temp;
                }
            }
        }
        return aparelhos;
    }