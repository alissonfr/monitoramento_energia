import { Aparelho } from "./controllers/AparelhoController";
import { Monitoramento } from "./controllers/MonitoramentoController";

class Main {
    constructor() { }

    public static main() {
        const monitoramento = new Monitoramento(10);
        setTimeout(() => {
            this.verificarAparelhos(monitoramento)
        }, 2000);


    }

    public static verificarAparelhos(monitoramento: Monitoramento) {
        setInterval(() => {
            for (let i = 0; i < monitoramento.aparelhos.length; i++) {
                const aparelho = monitoramento.aparelhos[i];
                for (let j = 0; j < aparelho.leituras.length; j++) {
                    const leitura = aparelho.leituras[j];
                    if (leitura > 0.9 * aparelho.potencia_max) {
                        console.log(
                            `🚨 GRAVE: Na leitura ${j + 1} o aparelho ${aparelho.nome} demonstrou estar operando com a potencia de ${leitura}W que é mais de 90% da sua potência máxima (${aparelho.potencia_max}W)`
                        );
                    }
                }
                console.log(`Leituras do aparelho ${aparelho.nome}: [ ${aparelho.leituras} ]\n`);
            }

        }, 2000);

        process.on('exit', () => {
            for (let i = 0; i < monitoramento.aparelhos.length; i++) {
                const aparelho = monitoramento.aparelhos[i];
                aparelho.gerarLeiturasWorker.terminate();
            }
        });
    }
}

Main.main();