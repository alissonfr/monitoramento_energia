// Interface para dispositivos elétricos
export interface AparelhoModel {
  nome: string;
  tipo: string;
  potencia_min: number;
  potencia_max: number;
  energiaConsumida?: number;
  }