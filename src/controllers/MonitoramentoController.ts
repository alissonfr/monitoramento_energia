import data from '../assets/data.json';
import { GetAparelhosResponse } from '../models/GetAparelhosResponse';
import { Aparelho } from './AparelhoController';
import path from 'path'
import * as fs from 'fs';
import crypto from "crypto-js"
import { Worker } from "worker_threads";

export class Monitoramento {
  numAparelhos: number
  aparelhos: any[];
  hash: string;

  constructor(numAparelhos: number) {
    this.aparelhos = [];
    this.hash = "";
    this.numAparelhos = numAparelhos
  }

  /**
  * ##### Sobre:
  * Função retorna uma promise onde ela só é resolvida caso a leitura dos bytes do áudio e a thread inicie com sucesso.
  * 
  * ##### Complexidade:
  * A complexidade dessa função é O(n), onde n é o valor de this.numAparelhos. Isso ocorre devido ao loop for que itera this.numAparelhos vezes
  * 
  */
  iniciarMonitoramento(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Lê os bytes do áudio
      this.lerBytesDeAudio(path.join(__dirname, '../assets/ventoinha-pc.mp3'))
        .then((bytes: Buffer) => {
          // Cria o hash baseado no array de bytes do áudio e salva em this.hash
          this.gerarHash(bytes)

          const eletrodomesticosData: GetAparelhosResponse[] = data;

          for (let i = 1; i <= this.numAparelhos; i++) {
            const indiceAleatorio = Math.floor(Math.random() * eletrodomesticosData.length);
            const eletrodomestico = eletrodomesticosData[indiceAleatorio];
            const aparelho = new Aparelho(i, eletrodomestico.nome, eletrodomestico.tipo, eletrodomestico.potencia_min, eletrodomestico.potencia_max);
            this.iniciarThread(aparelho)
            this.aparelhos.push(aparelho)
          }

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
  * ##### Sobre:
  * Inicia a worker thread e realiza a verificação
  * 
  * ##### Complexidade:
  * A complexidade de tempo deste código seria O(n), onde n é o tamanho do array de leituras. Isso ocorre porque há 
  * um loop for que itera sobre as leituras e executa algumas operações de tempo constante em cada iteração.  
  * */
  iniciarThread(aparelho: Aparelho) {
    const gerarLeiturasWorker: Worker = new Worker(path.join(__dirname, '../utils/Worker.ts'));
    gerarLeiturasWorker.on("message", (leituras: number[]) => {
      aparelho.leituras = leituras;
      for (let i = 0; i < leituras.length; i++) {
        const leitura = leituras[i];
        if (leitura > 0.99 * aparelho.potencia_max) {
          console.log(
            `🚨 GRAVE: Na leitura ${i + 1}, o aparelho ${aparelho.nome} demonstrou estar operando com a potencia de ${leitura}W que é mais de 99% da sua potência máxima (${aparelho.potencia_max}W)`
          );
        }
      }
      console.log(`Leituras do aparelho ${aparelho.id} (${aparelho.nome}): [ ${leituras} ]\n`);
    });

    gerarLeiturasWorker.on("error", (error) => {
      console.error(`Erro no worker thread do aparelho ${aparelho.nome}: ${error}`);
    });

    gerarLeiturasWorker.postMessage({
      nome: aparelho.nome,
      potencia_min: aparelho.potencia_min,
      potencia_max: aparelho.potencia_max,
    });
  }

  /**
  * ##### Sobre:
  * Atribui um hash ao atributo hash da classe Monitoramento
  * 
  * ##### Complexidade:
  * A complexidade dessa função é O(n), onde 'n' é o número de elementos na matriz this.aparelhos. 
  * 
  */
  gerarHash(bytes: Buffer) {
    // Converte os bytes do parâmetro bytes em uma matriz de bytes
    const byteArray = Array.from(bytes);
    // Cria um objeto WordArray a partir da matriz de bytes utilizando o método lib.WordArray.create(byteArray) da biblioteca crypto-js
    const wordArray = crypto.lib.WordArray.create(byteArray);
    // Calcula o hash SHA256 do objeto WordArray utilizando o método crypto.SHA256(wordArray)
    const hash = crypto.SHA256(wordArray);
    this.hash = hash.toString();
  }

  /**
  * ##### Sobre:
  * Retorna um array de strings contendo os aparelhos criptografados.
  * 
  * ##### Complexidade:
  * A complexidade dessa função é O(n), onde 'n' é o número de elementos na matriz this.aparelhos. 
  * 
  */
  getAparelhos(): string[] {
    const aparelhosCriptografados: string[] = []

    for (let index = 0; index < this.aparelhos.length; index++) {
      const aparelho = this.aparelhos[index];
      // Criptografando o aparelho usando o algoritmo AES com a chave this.hash.
      const aparelhoCriptografado = crypto.AES.encrypt(JSON.stringify(aparelho), this.hash).toString();
      aparelhosCriptografados.push(aparelhoCriptografado);
    }

    return aparelhosCriptografados
  }

  /**
  * ##### Sobre:
  * Utiliza a função fs.readFile para fazer chamada assíncrona que lê os bytes de um arquivo e 
  * e retorna o resultado por meio de um callback
  * 
  * ##### Complexidade:
  * A complexidade desse código é O(1), pois independentemente do tamanho do arquivo de áudio, 
  * a função em si não possui loops ou iterações que dependam do tamanho dos dados de entrada
  */
  lerBytesDeAudio(path: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      fs.readFile(path, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  
  /**
  * ##### Sobre:
  * Retorna o atributo string 'hash'
  * 
  * ##### Complexidade:
  * Complexidade O(1), já que a função simplesmente retorna o valor da propriedade hash, 
  * sem nenhuma iteração ou operação que dependa do tamanho dos dados
  */
  getHash(): string {
    return this.hash;
  }

}