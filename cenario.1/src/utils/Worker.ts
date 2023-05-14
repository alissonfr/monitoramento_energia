const { parentPort } = require("worker_threads");

interface AparelhoData {
  id: number;
  nome: string;
  tipo: string;
  potencia_min: number;
  potencia_max: number;
}

let intervalId: NodeJS.Timeout;

parentPort.on("message", (aparelho: AparelhoData) => {
  const { potencia_max, potencia_min, nome } = aparelho;
  intervalId = setInterval(() => {
    const leituras = [];
    for (let i = 1; i <= 10; i++) {
      const consumoVariacao = Math.round(Math.random() * (potencia_max - potencia_min + 1)) + potencia_min;

      // if (consumoVariacao > 0.9 * potencia_max) {
      //   console.log(
      //     `🚨 GRAVE: Na leitura ${i} o aparelho ${nome} demonstrou estar operando com a potencia de ${consumoVariacao}W que é mais de 90% da sua potência máxima (${potencia_max}W)`
      //   );
      // }

      leituras.push(consumoVariacao);
    }
    parentPort.postMessage(leituras);
  }, 2000);
});

// FInalizando threads
process.on('exit', () => {
  clearInterval(intervalId);
});
