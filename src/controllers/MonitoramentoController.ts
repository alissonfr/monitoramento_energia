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
      * A complexidade desse loop é O(n), onde n é o número de aparelhos, já que ele itera numAparelhos vezes. A razão para isso é que a quantidade de vezes que o 
      * loop executa é diretamente proporcional ao número de aparelhos que precisam ser criados.
      */
      for (let i = 1; i <= numAparelhos; i++) {
        const indiceAleatorio = Math.floor(Math.random() * eletrodomesticosData.length);
        const eletrodomestico = eletrodomesticosData[indiceAleatorio];
        this.aparelhos.push(new Aparelho(i , eletrodomestico.nome, eletrodomestico.tipo, eletrodomestico.potencia_min, eletrodomestico.potencia_max ))
      }

      this.gerarLeituras()
    }
  
    /**
    * ##### Sobre:
    * Este algoritmo simula a geração de leituras de consumo para cada aparelho monitorado. Ele itera por uma lista de aparelhos e 
    * gera 10 leituras aleatorias para cada aparelho com uma variação de 10% entre cada leitura
    * 
    * ##### Complexidade:
    * A complexidade deste algoritmo é O(n), onde n é o número de aparelhos na lista. O loop externo executa uma vez para cada aparelho, 
    * independentemente do tamanho da lista, e o loop interno executa sempre 10 vezes. Portanto, a quantidade total de iterações do loop interno 
    * é sempre 10 vezes o número de aparelhos. Como a notação big O desconsidera constantes, podemos dizer que a complexidade é O(n).
    */
    gerarLeituras() {
      for (let i = 0; i < this.aparelhos.length; i++) {
        const aparelho = this.aparelhos[i]
        for (let j = 0; j < 10; j++) {
          const variacao = Math.random() * 0.1 - 0.05; // variação aleatória entre -5% e 5%
          const consumo = Math.round(Math.random() * (aparelho.potencia_max - aparelho.potencia_min) + aparelho.potencia_min); // número aleatório entre potência mínima e máxima, arredondado para o inteiro mais próximo
          const consumoVariacao = Math.round(consumo * (1 + variacao)); // consumo  variação de 10%, arredondado para o inteiro mais próximo
          aparelho.consumo_total += consumoVariacao; // incrementa o consumo total
          aparelho.leituras.push(consumoVariacao); // adiciona a leitura à lista de leituras do aparelho
        }
      }
    }
    
    // MÉTODOS PARA IMPRIMIR OS VALORES LIDOS
    
    imprimirAparelhos() {
      console.log("(d.1) Lista de aparelhos monitorados:");
      console.table(this.aparelhos, ['id', 'nome', 'tipo', 'consumo_total']);
      console.log('----------------------------------------------------------------')
    }

    // Função para ordenar e exibir os aparelhos por número de leituras crescente
    imprimirLeituraAparelhos() {
      console.log('(d.2) Lista das leituras por aparelho monitorado')
      for (let i = 0; i < this.aparelhos.length; i++) {
        const aparelho = this.aparelhos[i]
        console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`)
      }
      console.log('----------------------------------------------------------------')
    }
    
    // Função para ordenar e exibir os aparelhos por número de leituras crescente
    imprimirLeituraAparelhosCrescente() {
      const aparelhosOrdenados = ordenarCrescente(this.aparelhos);
      console.log('(d.3) Lista das leituras por aparelho monitorado ordenados por ordem crescente')
      for (let i = 0; i < aparelhosOrdenados.length; i++) {
        const aparelho = aparelhosOrdenados[i]
        console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`)
      }
      console.log('----------------------------------------------------------------')
    }
  
    imprimirConsumoTotalGeral() {
      let total = 0;
      for (let i = 0; i < this.aparelhos.length; i++) {
        const aparelho = this.aparelhos[i]
        total += aparelho.calcularConsumoTotal();
      }
      console.log(`Consumo total de todos os aparelhos por 10 horas: ${total} watts`);
      console.log('----------------------------------------------------------------')
    }
  }