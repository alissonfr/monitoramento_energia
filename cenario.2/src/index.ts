import { Aparelho } from "./controllers/AparelhoController";
import { Monitoramento } from "./controllers/MonitoramentoController";

class Main {
    constructor() { }

    // Complexidade: O(1). Ou seja, o tempo de execução não varia com o tamanho dos dados de entrada.
    public static main() {
        const monitoramento = new Monitoramento(10);
        setTimeout(() => {
            monitoramento.imprimirAparelhos();
            monitoramento.imprimirLeituraAparelhos();
            monitoramento.imprimirLeituraAparelhos();
            monitoramento.imprimirLeituraAparelhosCrescente();
            monitoramento.encontrarMaiorDiferenca();
        }, 3000)

    }
}

Main.main();