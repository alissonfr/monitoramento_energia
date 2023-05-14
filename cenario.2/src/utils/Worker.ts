import { parentPort } from 'node:worker_threads'

interface AparelhoData {
  nome: string;
  potencia_min: number;
  potencia_max: number;

}

let intervalId: NodeJS.Timeout;

parentPort?.on("message", (aparelho: AparelhoData) => {
  intervalId = setInterval(() => {
    const { nome, potencia_max, potencia_min, } = aparelho;
    const leituras: number[] = [];
    for (let i = 1; i <= 10; i++) {
      const consumoVariacao = Math.round(Math.random() * (potencia_max - potencia_min + 1)) + potencia_min;
      leituras.push(consumoVariacao);
    }

    parentPort?.postMessage(leituras);
  }, 2000);
});

// FInalizando threads
process.on('exit', () => {
  clearInterval(intervalId);
});
