import { Monitoramento } from "./controllers/MonitoramentoController";

let monitoramento = new Monitoramento(2);

monitoramento.imprimirAparelhos();

monitoramento.imprimirLeituraAparelhos();

monitoramento.imprimirLeituraAparelhosCrescente();

monitoramento.imprimirConsumoTotalGeral()
