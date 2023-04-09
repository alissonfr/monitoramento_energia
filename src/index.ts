import { Monitoramento } from "./controllers/MonitoramentoController";
import { encontrarMaiorDiferenca } from "./utils/Extra";

class Main {
    constructor() {}
  
    public static main() {
        const monitoramento = new Monitoramento(5);

        monitoramento.imprimirAparelhos();
        monitoramento.imprimirLeituraAparelhos();
        monitoramento.imprimirLeituraAparelhosCrescente();
        monitoramento.imprimirConsumoTotalGeral()
        encontrarMaiorDiferenca(monitoramento.aparelhos)
    }
  }

  Main.main();