import { AparelhoModel } from "../models/AparelhoModel";

export class Aparelho implements AparelhoModel {
  id: number;
  nome: string;
  tipo: string;
  potencia_min: number;
  potencia_max: number;
  leituras: number[];

  /**
* ##### Sobre:
* Função para ordenar e exibir os aparelhos por número de leituras na ordem crescente
* 
* ##### Complexidade:
* A complexidade de tempo deste código seria O(1) ou constante, já que o tempo de execução não 
* aumenta à medida que a entrada de dados aumenta 
* */
  constructor(id: number, nome: string, tipo: string, potencia_min: number, potencia_max: number) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.potencia_min = potencia_min;
    this.potencia_max = potencia_max;
    this.leituras = [];
  }


}
