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

    private static imprimirAparelhos(aparelhos: Aparelho[]): void {
        console.log("(d.1) Lista de aparelhos monitorados:");
        console.table(aparelhos, ['id', 'nome', 'tipo']);
        console.log('----------------------------------------------------------------');
    }

    private static imprimirLeituraAparelhos(aparelhos: Aparelho[]): void {
        console.log('(d.2) Lista das leituras por aparelho monitorado');
        for (let i = 0; i < aparelhos.length; i++) {
            const aparelho = aparelhos[i];
            console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`);
        }
        console.log('----------------------------------------------------------------');
    }

    private static imprimirLeituraAparelhosCrescente(aparelhos: Aparelho[]): void {
        const aparelhosOrdenados = ordenarCrescente(aparelhos);
        console.log('(d.3) Lista das leituras por aparelho monitorado ordenados por ordem crescente');
        for (let i = 0; i < aparelhosOrdenados.length; i++) {
            const aparelho = aparelhosOrdenados[i];
            console.log(`(ID ${aparelho.id}) - ${aparelho.nome} - [ ${aparelho.leituras} ]`);
        }
        console.log('----------------------------------------------------------------');
    }
    private static encontrarMaiorDiferenca(aparelhos: Aparelho[]): void {
        const n = aparelhos.length;
        let maiorDiferenca = 0;
        let nomeAparelhoMaiorDiferenca = '';

        for (let i = 0; i < n; i++) {
            const aparelho = aparelhos[i];
            const leituras = aparelho.leituras;
            const m = leituras.length;

            for (let j = 0; j < m; j++) {
                for (let k = j + 1; k < m; k++) {
                    const diferenca = Math.abs(leituras[j] - leituras[k]);
                    if (diferenca > maiorDiferenca) {
                        maiorDiferenca = diferenca;
                        nomeAparelhoMaiorDiferenca = aparelho.nome;
                    }
                }
            }
        }
        console.log('(d.4) Maior diferença entre as leituras de todos os aparelhos:');
        console.log(`Aparelho com maior diferença: ${nomeAparelhoMaiorDiferenca}`);
        console.log(`Maior diferença: ${maiorDiferenca}`);
        console.log('----------------------------------------------------------------');
    }
}

Main.main();