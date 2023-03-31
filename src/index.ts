import data from './assets/data.json';
import { AparelhoModel } from './models/AparelhoModel';

// A interface AparelhoModel define a estrutura dos objetos no array. 
// A variável eletrodomesticos contém o array de objetos JSON. 
let eletrodomesticos: AparelhoModel[] = data
// A nova variável eletrodomesticosAleatorios é um novo array que vai conter os a quantidade de objetos aleatórios selecionados.
const eletrodomesticosAleatorios: any[] = [];
const TOTAL_OBJETOS: number = 10

// O loop for seleciona a quantidade de objetos aleatórios indicada na variavel TOTAL_OBJETOS usando o método Math.random() e
// o método Math.floor() para gerar um índice aleatório dentro do array. Em seguida, a variável eletrodomestico é definida como o 
// objeto correspondente ao índice aleatório. Por fim, a variável potenciaAleatoria é gerada usando o método Math.random() e 
// o método Math.floor() para gerar um valor aleatório dentro da faixa de potências do objeto, e é adicionada ao array eletrodomesticosAleatorios
for (let i = 0; i < TOTAL_OBJETOS; i++) {
  const indiceAleatorio = Math.floor(Math.random() * eletrodomesticos.length);
  const eletrodomestico = eletrodomesticos[indiceAleatorio];
  const potenciaAleatoria = Math.floor(Math.random() * (eletrodomestico.potencia_max - eletrodomestico.potencia_min + 1)) + eletrodomestico.potencia_min;
  eletrodomesticosAleatorios.push({ nome: eletrodomestico.nome, potencia: potenciaAleatoria });
}

console.log(eletrodomesticosAleatorios)

// O resultado é um novo array de objetos que contém 10 objetos aleatórios do array original, cada um com uma potência aleatória 
// selecionada dentro de sua faixa de potência mínima e máxima.
