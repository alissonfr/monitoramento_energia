import { Monitoramento } from "./controllers/MonitoramentoController";

// Cria uma instância do monitoramento com 3 aparelhos
let monitoramento = new Monitoramento(2);

// Imprime a lista de aparelhos monitorados
monitoramento.imprimirAparelhos();

// Imprime a lista de leituras para cada aparelho monitorado
monitoramento.imprimirLeituras();

// Imprime o consumo total de cada aparelho monitorado
monitoramento.imprimirConsumoTotal();

// Imprime o consumo total de cada aparelho monitorado
monitoramento.imprimirConsumoTotalGeral
