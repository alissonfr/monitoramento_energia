import { AparelhoModel } from "../models/AparelhoModel";
import { Worker } from "worker_threads";
import path from 'path'

export class Aparelho implements AparelhoModel {
  id: number;
  nome: string;
  tipo: string;
  potencia_min: number; // Em watts
  potencia_max: number; // Em watts
  leituras: number[]; // Em watts
  gerarLeiturasWorker: Worker;

  constructor(id: number, nome: string, tipo: string, potencia_min: number, potencia_max: number) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.potencia_min = potencia_min;
    this.potencia_max = potencia_max;
    this.leituras = [];
    this.gerarLeiturasWorker = new Worker(path.join(__dirname, '../utils/Worker.ts'));

    this.gerarLeiturasWorker.on("message", (leituras: number[]) => {
      this.leituras = leituras;
    });

    this.gerarLeiturasWorker.on("error", (error) => {
      console.error(`Erro no worker thread do aparelho ${this.nome}: ${error}`);
    });

    this.gerarLeiturasWorker.postMessage({
      nome: this.nome,
      potencia_min: this.potencia_min,
      potencia_max: this.potencia_max,
    });
  }
}
