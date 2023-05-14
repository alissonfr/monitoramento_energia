import { Aparelho } from "./controllers/AparelhoController";
import { Monitoramento } from "./controllers/MonitoramentoController";

class Main {
    constructor() { }

    // Complexidade: O(1). Ou seja, o tempo de execução não varia com o tamanho dos dados de entrada.
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

      /***
   * ##### Sobre:
   * O código verifica todos os aparelhos periodicamente e olha
   * se há algum aparelho está operando próximo de sua potência máxima e, caso positivo, emite um alerta.
   * 
   * No entanto, a função é executada em um intervalo de 2 segundos, o que pode levar a muitas iterações ao longo do tempo, o que pode afetar o 
   * desempenho do sistema de forma significativa. Além disso, a função contém uma chamada para setInterval, que é executada continuamente, e uma 
   * chamada para process.on('exit'), que é executada quando o processo é encerrado. Estas operações adicionais podem ter impacto no desempenho e no 
   * uso da memória do sistema.
   * 
   * ##### Complexidade: 
   * A função verificarAparelhos contém dois loops aninhados, o primeiro percorre os aparelhos e o segundo percorre as leituras de cada aparelho. 
   * Assumindo que n é o número total de aparelhos e m é o número máximo de leituras que um aparelho pode ter, a complexidade de tempo é O(n * m). 
   * 
   */
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
                console.log(`Leituras do aparelho ${aparelho.id} (${aparelho.nome}): [ ${aparelho.leituras} ]\n`);
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