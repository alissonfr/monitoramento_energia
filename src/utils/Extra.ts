import { AparelhoModel } from "../models/AparelhoModel";

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
    export function encontrarMaiorDiferenca(aparelhos: AparelhoModel[]): void {
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