import { AparelhoModel } from "../models/AparelhoModel";

export class Aparelho implements AparelhoModel {
    id: number;
    nome: string;
    tipo: string;
    potencia_min: number; // Em watts
    potencia_max: number; // Em watts
    consumo_total: number; // Em watts
    leituras: number[]; // Em watts
  
    constructor(id: number, nome: string, tipo: string, potencia_min: number, potencia_max: number) {
      this.id = id;
      this.nome = nome;
      this.tipo = tipo;
      this.potencia_min = potencia_min;
      this.potencia_max = potencia_max;
      this.consumo_total = 0;
      this.leituras = [];
    }
  
    /**
    * ##### Sobre:
    * A função utiliza um loop for para percorrer cada elemento do array e somá-los a variável total
    * 
    * ##### Complexidade:
    * A complexidade assintótica desta função é O(n), onde n é o número de elementos no 
    * array de leituras leituras.  Como o loop é executado uma vez para cada elemento do array, 
    * a complexidade é linear em relação ao tamanho do array.
    */
    calcularConsumoTotal(): number {
      let total = 0;
      for (let leitura of this.leituras) {
        total += leitura;
      }
      return total;
    }
  }