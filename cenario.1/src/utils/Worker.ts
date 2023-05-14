const { parentPort } = require("worker_threads");

interface AparelhoData {
  potencia_min: number;
  potencia_max: number;
}

let intervalId: NodeJS.Timeout;


/***
* ##### Sobre:
* O código apresentado é executado em uma thread de trabalho (worker thread) e é responsável por gerar 
* leituras de um aparelho elétrico com potência variável.
* Ele cria um intervalo de tempo que executa a cada 2 segundos e, dentro desse intervalo, um laço de repetição é executado 10 vezes 
* para gerar 10 leituras aleatórias entre a potência mínima e a potência máxima do aparelho.
* 
* ##### Complexidade: 
* Como o for é executado sempre com o mesmo número de iterações (10), a complexidade desse código é O(1), já que o 
* tempo de execução não varia com o tamanho dos dados de entrada. No entanto, se o laço "for" fosse executado com um número de iterações variável, a complexidade do código seria O(n), onde "n" seria o número de iterações.
*/
parentPort.on("message", (aparelho: AparelhoData) => {
  const { potencia_max, potencia_min } = aparelho;
  intervalId = setInterval(() => {
    const leituras = [];
    for (let i = 1; i <= 10; i++) {
      const consumoVariacao = Math.round(Math.random() * (potencia_max - potencia_min + 1)) + potencia_min;
      leituras.push(consumoVariacao);
    }
    parentPort.postMessage(leituras);
  }, 2000);
});

// FInalizando threads
process.on('exit', () => {
  clearInterval(intervalId);
});
