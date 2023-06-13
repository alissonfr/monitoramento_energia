import data from '../assets/data.json';
import { AparelhoModel } from '../models/AparelhoModel';
import { GetAparelhosResponse } from '../models/GetAparelhosResponse';
import { ordenarCrescente } from '../utils/Ordenadores';
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
    * Este escolhe os aparelhos aleatoriamente e os instancia na classe Aparelho
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


  // MÉTODOS PARA IMPRIMIR OS VALORES LIDOS

  /**
  * ##### Sobre:
  * Função simples que imprime uma tabela de dados na saída 
  * do console, e portanto, a sua complexidade não depende do tamanho dos dados, 
  * 
  * ##### Complexidade:
  * Por ser uma função simples que apenas imprime uma tabela de dados na saída 
  * do console, sua complexidade não depende do tamanho dos dados.
  */
  imprimirAparelhos(): void {
    console.log("(d.1) Lista de aparelhos monitorados:");
    console.table(this.aparelhos, ['id', 'nome', 'tipo']);
    console.log('----------------------------------------------------------------')
  }

  /**
  * ##### Sobre:
  * Função para exibir os aparelhos
  * 
  * ##### Complexidade:
  * A complexidade desta função é O(n) (linear), onde n é o número de aparelhos na lista. Isso ocorre porque o 
  * algoritmo itera pela lista de aparelhos uma vez e, para cada aparelho, imprime seu array de leituras
  * Portanto, se a entrada de dados for muito grande, o tempo de execução do algoritmo também aumentará proporcionalmente, 
  * o que pode levar a um tempo de processamento significativo.
  */
  getHash(): string {
    return this.hash;
  }

  /**
  * ##### Sobre:
  * Função para ordenar e exibir os aparelhos por número de leituras na ordem crescente
  * 
  * ##### Complexidade:
  * A complexidade desta função é O(n^2) (quadrática), onde n é o número de aparelhos na lista. Isso ocorre porque a função ordenarCrescente() é 
  * chamado primeiro, que possui uma complexidade O(n^2). Em seguida, o algoritmo itera sobre a lista ordenada uma vez para imprimir as 
  * leituras de cada aparelho.
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