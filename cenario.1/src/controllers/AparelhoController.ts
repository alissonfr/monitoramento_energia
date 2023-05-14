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

  /***
   * ##### Sobre:
   * O código recebe parâmetros e inicializa as propriedades da instância da classe Aparelho
   * 
   * ##### Complexidade: 
   * A complexidade desse código é O(1), que indica que o tempo de execução não varia com o tamanho dos dados de entrada.
   * 
   */
  constructor(id: number, nome: string, tipo: string, potencia_min: number, potencia_max: number) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.potencia_min = potencia_min;
    this.potencia_max = potencia_max;
    this.leituras = [];

    const extensao = path.extname(__filename);
    const caminho = extensao === '.ts'
      ? path.join(__dirname, '../utils/Worker.ts')
      : path.join(__dirname, '../utils/Worker.js');
    this.gerarLeiturasWorker = new Worker(caminho);

    this.gerarLeiturasWorker.on("message", (leituras: number[]) => {
      this.leituras = leituras;
    });

    this.gerarLeiturasWorker.on("error", (error) => {
      console.error(`Erro no worker thread do aparelho ${this.nome}: ${error}`);
    });

    this.gerarLeiturasWorker.postMessage({
      potencia_min: this.potencia_min,
      potencia_max: this.potencia_max,
    });
  }
}