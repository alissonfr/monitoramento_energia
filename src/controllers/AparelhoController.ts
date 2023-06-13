import { AparelhoModel } from "../models/AparelhoModel";
import { Worker } from "worker_threads";
import path from 'path'

export class Aparelho implements AparelhoModel {
  id: number;
  nome: string;
  tipo: string;
  potencia_min: number;
  potencia_max: number;
  leituras: number[];
  gerarLeiturasWorker: Worker;

  /**
* ##### Sobre:
* Função para ordenar e exibir os aparelhos por número de leituras na ordem crescente
* 
* ##### Complexidade:
* A complexidade de tempo deste código seria O(n), onde n é o tamanho do array de leituras. Isso ocorre porque há 
* um loop for que itera sobre as leituras e executa algumas operações de tempo constante em cada iteração.  
* */
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

      for (let i = 0; i < leituras.length; i++) {
        const leitura = leituras[i];
        if (leitura > 0.99 * potencia_max) {
          console.log(
            `🚨 GRAVE: Na leitura ${i + 1}, o aparelho ${this.nome} demonstrou estar operando com a potencia de ${leitura}W que é mais de 99% da sua potência máxima (${this.potencia_max}W)`
          );
        }
      }

      console.log(`Leituras do aparelho ${this.id} (${this.nome}): [ ${leituras} ]\n`);
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
