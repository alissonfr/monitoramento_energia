import data from '../assets/data.json';
import { GetAparelhosResponse } from '../models/GetAparelhosResponse';
import { Aparelho } from './AparelhoController';
import path from 'path'
import * as fs from 'fs';
import crypto from "crypto-js"

export class Monitoramento {
  aparelhos: string[];
  hash: string

  constructor(numAparelhos: number) {
    this.aparelhos = [];
    this.hash = "";

    // A variável eletrodomesticosData contém o array de objetos JSON simulando um banco de dados externo. 
    const eletrodomesticosData: GetAparelhosResponse[] = data

    /**
    * ##### Sobre:
    * O trecho de código abaixo escolhe os aparelhos aleatoriamente e os instancia na classe Aparelho, 
    * o número de aparelhos é baseado em 'numAparelhos', valor passado quando a classe é instanciada.
    * Ante disso, o método utiliza a função auxiliar do tipo Promise 'lerBytesDeAudio' para obter o array de bytes de uma fonte de aleatoriedade real
    * e com isso gera um 'hash' para criptografar esses objetos do tipo Aparelho antes de manda-los para a Main.
    * 
    * ##### Complexidade:
    * A complexidade desse código é O(1), que indica que o tempo de execução não varia com o tamanho dos dados de entrada.
    */
    // Lê os bytes de um arquivo de áudio chamado "ventoinha-pc.mp3".
    this.lerBytesDeAudio(path.join(__dirname, '../assets/ventoinha-pc.mp3'))
      .then((bytes: Buffer) => {
        // Converte os bytes em um array de números inteiros.
        const byteArray = Array.from(bytes);
        // Cria uma estrutura de dados do tipo "WordArray" a partir do array de bytes.
        const wordArray = crypto.lib.WordArray.create(byteArray);
        // Calcula o hash SHA256 da estrutura "WordArray".
        const hash = crypto.SHA256(wordArray);
        this.hash = hash.toString()

        for (let i = 1; i <= numAparelhos; i++) {
          const indiceAleatorio = Math.floor(Math.random() * eletrodomesticosData.length);
          const eletrodomestico = eletrodomesticosData[indiceAleatorio];

          const aparelho = new Aparelho(i, eletrodomestico.nome, eletrodomestico.tipo, eletrodomestico.potencia_min, eletrodomestico.potencia_max)
          // Criptografa o objeto "Aparelho" utilizando o algoritmo AES com a chave sendo o valor da variável "hash".
          const aparelhoCriptografado = crypto.AES.encrypt(JSON.stringify(aparelho), this.hash).toString();
          this.aparelhos.push(aparelhoCriptografado)
        }
      })
      .catch((error) => {
        console.error('Erro ao ler o arquivo de áudio: ', error);
      });


  }

  /**
  * ##### Sobre:
  * Retorna o valor de this.hash
  * 
  * ##### Complexidade:
  * A complexidade da função é considerada O(1), pois não há loops ou iterações envolvidos
  */
  getHash(): string {
    return this.hash;
  }

  /**
  * ##### Sobre:
  * Recebe um caminho do sistema (path) e retorna os bytes de um arquivo de áudio.
  * 
  * ##### Complexidade:
  * A complexidade dessa função é de O(1). 
  * Isso ocorre porque a função apenas utiliza a operação fs.readFile, que é uma operação assíncrona que não envolve nenhum loop ou iteração. 
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
}