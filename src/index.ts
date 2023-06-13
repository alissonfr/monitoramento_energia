import { Aparelho } from "./controllers/AparelhoController";
import { Monitoramento } from "./controllers/MonitoramentoController";
import { ordenarCrescente } from "./utils/Ordenadores";
import crypto from "crypto-js"

class Main {
    constructor() { }

    // Complexidade: O(1). Ou seja, o tempo de execução não varia com o tamanho dos dados de entrada.
    public static main() {
        const monitoramento = new Monitoramento(10);
        const aparelhos: Aparelho[] = []

        for (let i = 0; i < monitoramento.aparelhos.length; i++) {
            const aparelhoCriptografado = monitoramento.aparelhos[i];
            const aparelhoDescriptografado = crypto.AES.decrypt(aparelhoCriptografado, monitoramento.getHash()).toString(CryptoJS.enc.Utf8);
            const aparelhoDecryptado = JSON.parse(aparelhoDescriptografado);
            aparelhos.push(aparelhoDecryptado);
        }        
        setTimeout(() => {
            this.imprimirAparelhos(aparelhos);
            this.imprimirLeituraAparelhos(aparelhos);
            this.imprimirLeituraAparelhosCrescente(aparelhos);
            this.encontrarMaiorDiferenca(aparelhos);
        }, 3000);
    }


    }
}

Main.main();