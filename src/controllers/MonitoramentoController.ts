import data from '../assets/data.json';
import { AparelhoModel } from '../models/AparelhoModel';
import { GetAparelhosResponse } from '../models/GetAparelhosResponse';
import { ordenarCrescente } from '../utils/Ordenadores';
import { Aparelho } from './AparelhoController';

export class Monitoramento {
    aparelhos: Aparelho[];
  
    constructor(numAparelhos: number) {
      this.aparelhos = [];
  
      // A variável eletrodomesticosData contém o array de objetos JSON simulando um banco de dados externo. 
      const eletrodomesticosData: GetAparelhosResponse[] = data
      
      /**
      * ##### Sobre:
      * Este escolhe os aparelhos aleatoriamente e os instancia na classe Aparelho
      * 
      * ##### Complexidade:
      * A complexidade desse loop é O(n) (linear), onde n é o número de aparelhos, já que ele itera numAparelhos vezes. A razão para isso é que a quantidade de vezes que o 
      * loop executa é diretamente proporcional ao número de aparelhos que precisam ser criados.
      * Assim, o tempo de execução do algoritmo aumentara proporcionalmente em relação a quantidade
      * de dados inseridos, o que pode levar a um tempo de processamento maior.
      */
      for (let i = 1; i <= numAparelhos; i++) {
        const indiceAleatorio = Math.floor(Math.random() * eletrodomesticosData.length);
        const eletrodomestico = eletrodomesticosData[indiceAleatorio];
        this.aparelhos.push(new Aparelho(i , eletrodomestico.nome, eletrodomestico.tipo, eletrodomestico.potencia_min, eletrodomestico.potencia_max ))
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
    imprimirAparelhos(): void {
      console.log("(d.1) Lista de aparelhos monitorados:");
      console.table(this.aparelhos, ['id', 'nome', 'tipo', 'consumo_total']);
      console.log('----------------------------------------------------------------')
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
    imprimirLeituraAparelhos(): void {
      console.log('(d.2) Lista das leituras por aparelho monitorado')
      for (let i = 0; i < this.aparelhos.length; i++) {
        const aparelho = this.aparelhos[i]
        console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`)
      }
      console.log('----------------------------------------------------------------')
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
    imprimirLeituraAparelhosCrescente(): void {
      const aparelhosOrdenados = ordenarCrescente(this.aparelhos);
      console.log('(d.3) Lista das leituras por aparelho monitorado ordenados por ordem crescente')
      for (let i = 0; i < aparelhosOrdenados.length; i++) {
        const aparelho = aparelhosOrdenados[i]
        console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`)
      }
      console.log('----------------------------------------------------------------')
    }
  
    /**
    * ##### Sobre:
    * Esta função apenas itera por todos os aparelhos instanciados e soma o total de W gastos nas leituras
    * feitas de todos os aparelhos juntos.
    * 
    * ##### Complexidade:
    * A complexidade deste algoritmo é O(n) (linear), onde n é o número de aparelhos na lista. Isso ocorre porque o algoritmo 
    * itera pela lista de aparelhos uma vez e chama a função "calcularConsumoTotal" de cada aparelho.
    * Portanto, se a entrada de dados for muito grande, o tempo de execução do algoritmo também aumentará proporcionalmente, 
    * o que pode levar a um tempo de processamento significativo.
    */
    imprimirConsumoTotalGeral(): void {
      let total = 0;
      for (let i = 0; i < this.aparelhos.length; i++) {
        const aparelho = this.aparelhos[i]
        total += aparelho.calcularConsumoTotal();
      }
      console.log(`Consumo total de todos os aparelhos por 10 horas: ${total} watts`);
      console.log('----------------------------------------------------------------')
    }
  }