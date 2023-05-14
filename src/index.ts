import { Aparelho } from "./controllers/AparelhoController";
import { Monitoramento } from "./controllers/MonitoramentoController";

class Main {
    constructor() { }

    public static main() {
        const monitoramento = new Monitoramento(10);

    }
}

Main.main();