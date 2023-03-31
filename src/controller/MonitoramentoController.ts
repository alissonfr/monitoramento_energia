import data from '../assets/data.json';
import { GetAparelhosResponse } from '../models/GetAparelhosResponse';
import { Aparelho } from './AparelhoController';

export class Monitoramento {
    // aparelhos vai conter todos os aparelhos instanciados
    aparelhos: Aparelho[];
  
    constructor(numAparelhos: number) {
      this.aparelhos = [];
  
      // A variável eletrodomesticosData contém o array de objetos JSON simulando um banco de dados externo. 
      const eletrodomesticosData: GetAparelhosResponse[] = data
  
      // O loop seleciona objetos aleatórios usando o método Math.random() e o método Math.floor() para gerar um índice aleatório dentro do array. 
      // Em seguida, a variável eletrodomestico é definida como o objeto correspondente ao índice aleatório. 
      // Após isso, variável potenciaAleatoria é gerada usando o método Math.random() e o método Math.floor() para gerar um valor aleatório dentro da faixa de potências do objeto
      // Por fim, utiliza-se o metodo push para colocar os aparelhos instanciados com nome e potencia aleatória no array aparelhos
      for (let i = 1; i <= numAparelhos; i++) {
        const indiceAleatorio = Math.floor(Math.random() * eletrodomesticosData.length);
        const eletrodomestico = eletrodomesticosData[indiceAleatorio];
        const potenciaAleatoria = Math.floor(Math.random() * (eletrodomestico.potencia_max - eletrodomestico.potencia_min + 1)) + eletrodomestico.potencia_min;
        this.aparelhos.push(new Aparelho(i , eletrodomestico.nome, potenciaAleatoria ));
      }
    }
  }