const { parentPort } = require("worker_threads");

interface AparelhoData {
  nome: string;
  potencia_min: number;
  potencia_max: number;

}

let intervalId: NodeJS.Timeout;

parentPort.on("message", (aparelho: AparelhoData) => {
  const { nome, potencia_max, potencia_min, } = aparelho;
  intervalId = setInterval(() => {
    const leituras = [];
    for (let i = 1; i <= 10; i++) {
      const consumoVariacao = Math.round(Math.random() * (potencia_max - potencia_min + 1)) + potencia_min;

      leituras.push(consumoVariacao);
    }

    // Aguardando que todas as leituras sejam computadas
    for (let i = 0; i < leituras.length; i++) {
      const leitura = leituras[i];
      if (leitura > 0.9 * potencia_max) {
        console.log(
          `🚨 GRAVE: Na leitura ${i + 1}, o aparelho ${nome} demonstrou estar operando com a potencia de ${leitura}W que é mais de 90% da sua potência máxima (${potencia_max}W)`
        );
      }
    }
    console.log(`Leituras do aparelho ${nome}: [ ${leituras} ]\n`);




    parentPort.postMessage(leituras);
  }, 2000);
});

// FInalizando threads
process.on('exit', () => {
  clearInterval(intervalId);
});
