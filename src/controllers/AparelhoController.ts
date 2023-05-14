import { AparelhoModel } from "../models/AparelhoModel";

export class Aparelho implements AparelhoModel {
  id: number;
  nome: string;
  tipo: string;
  potencia_min: number; // Em watts
  potencia_max: number; // Em watts
  leituras: number[]; // Em watts
  gerarLeiturasPromise: Promise<number[]>;

  constructor(id: number, nome: string, tipo: string, potencia_min: number, potencia_max: number) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.potencia_min = potencia_min;
    this.potencia_max = potencia_max;
    this.leituras = [];
    this.gerarLeiturasPromise = Promise.resolve([]);

    setInterval(() => {
      this.gerarLeiturasPromise = new Promise<number[]>((resolve) => {
        const leituras = [];
        for (let i = 1; i <= 10; i++) {
          const consumoVariacao = Math.round(Math.random() * (this.potencia_max - this.potencia_min + 1)) + this.potencia_min;

          if (consumoVariacao > 0.9 * this.potencia_max) {
            console.log(`🚨 GRAVE: Na leitura ${i} o aparelho ${this.nome} demonstrou estar operando com a potencia de ${consumoVariacao}W que é mais de 90% da sua potência máxima (${this.potencia_max}W)`);
          }

          leituras.push(consumoVariacao);
        }
        resolve(leituras);
      });

      this.gerarLeiturasPromise.then((leituras) => {
        this.leituras = leituras;
        console.log(`Leituras do aparelho ${this.nome}: [ ${this.leituras} ]\n`)
      });
    }, 2000);
  }
}
