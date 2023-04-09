import { Monitoramento } from "./controllers/MonitoramentoController";
import { encontrarMaiorDiferenca } from "./utils/Extra";

let monitoramento = new Monitoramento(5);

monitoramento.imprimirAparelhos();

monitoramento.imprimirLeituraAparelhos();

monitoramento.imprimirLeituraAparelhosCrescente();

monitoramento.imprimirConsumoTotalGeral()

encontrarMaiorDiferenca(monitoramento.aparelhos)
