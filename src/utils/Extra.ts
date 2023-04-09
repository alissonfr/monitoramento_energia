import { AparelhoModel } from "../models/AparelhoModel";

    /**
    * ##### Sobre:
    * Essa função percorre cada aparelho e, para cada aparelho, percorre e compara todas as leituras entre si para encontrar a maior 
    * diferença entre duas leituras. Ou seja, ela encontra a maior discrepancia absoluta entre as leituras 
    * dos aparelhos. 
    * 
    * ##### Complexidade:
    * Como existem três loops aninhados, a complexidade da função é cúbica. Ou seja,
    * a complexidade desse algoritmo é O(n^3), onde n é o número total de leituras em todos os aparelhos
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