import { AparelhoModel } from "../models/AparelhoModel";

export class Aparelho implements AparelhoModel {
    id: number;
    nome: string;
    consumo: number; // Em watts
    leituras: number[]; // Em watts
  
    // Classe aparelho:
        // - ID do aparelho para identificação;
        // - Nome do aparelho;
        // - Consumo do aparelho;
    constructor(id: number, nome: string, consumo: number) {
      this.id = id;
      this.nome = nome;
      this.consumo = consumo;
      this.leituras = [];
    }
  
    calcularConsumoTotal(): number {
      // Calcula o consumo total do aparelho com base nas leituras registradas
      let total = 0;
      for (let leitura of this.leituras) {
        total += leitura;
      }
      return total;
    }
  }