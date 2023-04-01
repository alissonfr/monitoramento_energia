import data from '../assets/data.json';
import { GetAparelhosResponse } from '../models/GetAparelhosResponse';
import { Aparelho } from './AparelhoController';

export class Monitoramento {
    // aparelhos vai conter todos os aparelhos instanciados
    aparelhos: Aparelho[];
  
    constructor(numAparelhos: number) {
      this.aparelhos = [];
  
      // A variável eletrodomesticosData contém o array de objetos JSON simulando um banco de dados externo. 
      const eletrodomesticosData: GetAparelhosResponse[] = data
  
      // O loop seleciona objetos aleatórios usando o método Math.random() e o método Math.floor() para gerar um índice aleatório dentro do array. 
      // Em seguida, a variável eletrodomestico é definida como o objeto correspondente ao índice aleatório. 
      // Após isso, variável potenciaAleatoria é gerada usando o método Math.random() e o método Math.floor() para gerar um valor aleatório dentro da faixa de potências do objeto
      // Por fim, utiliza-se o metodo push para colocar os aparelhos instanciados com nome e potencia aleatória no array aparelhos
      for (let i = 1; i <= numAparelhos; i++) {
        const indiceAleatorio = Math.floor(Math.random() * eletrodomesticosData.length);
        const eletrodomestico = eletrodomesticosData[indiceAleatorio];
        const potenciaAleatoria = Math.floor(Math.random() * (eletrodomestico.potencia_max - eletrodomestico.potencia_min + 1)) + eletrodomestico.potencia_min;
        this.aparelhos.push(new Aparelho(i , eletrodomestico.nome, potenciaAleatoria ));
      }

      this.gerarLeituras()
    }
  
    /*
    Este algoritmo simula a geração de leituras de consumo para cada aparelho monitorado. Ele itera por uma lista de aparelhos e 
    gera aleatoriamente 10 leituras para cada aparelho, adicionando-as ao atributo "leituras" do aparelho correspondente.
    A geração de cada leitura é realizada de forma aleatória através da função Math.random(), que gera um número aleatório entre 0 e 1. 
    Esse número é multiplicado pelo valor do consumo do aparelho e arredondado para baixo com a função Math.floor(), resultando em um valor 
    inteiro aleatório dentro do intervalo.
    */
    gerarLeituras() {
      for (let aparelho of this.aparelhos) {

        for (let i = 0; i < 10; i++) {
          aparelho.leituras.push(Math.floor(Math.random() * aparelho.consumo) + 1);
        }
      }
    }

    // MÉTODOS PARA IMPRIMIR OS VALORES LIDOS
  
    imprimirAparelhos() {
      console.log("Lista de aparelhos monitorados:");
      for (let aparelho of this.aparelhos) {
        console.log(`- ${aparelho.nome} (ID ${aparelho.id}): ${aparelho.consumo} watts`);
      }
      console.log('----------------------------------------------------------------')
    }
  
    imprimirLeituras() {
      console.log("Lista de leituras para cada aparelho monitorado:");
      for (let aparelho of this.aparelhos) {
        console.log(`- ${aparelho.nome} (ID ${aparelho.id}):`);
        console.log(aparelho.leituras);
      }
      console.log('----------------------------------------------------------------')
    }
  
    imprimirConsumoTotal() {
      console.log("Consumo total de cada aparelho monitorado:");
      for (let aparelho of this.aparelhos) {
        console.log(`- ${aparelho.nome} (ID ${aparelho.id}): ${aparelho.calcularConsumoTotal()} watts`);
      }
      console.log('----------------------------------------------------------------')
    }
  
    imprimirConsumoTotalGeral() {
      console.log("Consumo total geral:");
      let total = 0;
      for (let aparelho of this.aparelhos) {
        total += aparelho.calcularConsumoTotal();
      }
      console.log(`${total} watts`);
      console.log('----------------------------------------------------------------')
    }
  }