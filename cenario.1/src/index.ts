import { Aparelho } from "./controllers/AparelhoController";
import { Monitoramento } from "./controllers/MonitoramentoController";

class Main {
    constructor() { }

    public static async main() {
        const monitoramento = new Monitoramento(10);
        setTimeout(() => {
            this.verificarAparelhos(monitoramento)
            monitoramento.imprimirAparelhos();
            monitoramento.imprimirLeituraAparelhos();
            monitoramento.imprimirLeituraAparelhos();
            monitoramento.imprimirLeituraAparelhosCrescente();
            monitoramento.encontrarMaiorDiferenca();
        }, 5000)

    }

    public static verificarAparelhos(monitoramento: Monitoramento) {
        setInterval(() => {
            console.log('====================== VERIFICANDO APARELHOS NA MAIN ======================')
            for (let i = 0; i < monitoramento.aparelhos.length; i++) {
                const aparelho = monitoramento.aparelhos[i];
                for (let j = 0; j < aparelho.leituras.length; j++) {
                    const leitura = aparelho.leituras[j];
                    if (leitura > 0.99 * aparelho.potencia_max) {
                        console.log(
                            `🚨 GRAVE: Na leitura ${j + 1}, o aparelho ${aparelho.nome} demonstrou estar operando com a potencia de ${leitura}W que é mais de 99% da sua potência máxima (${aparelho.potencia_max}W)`
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