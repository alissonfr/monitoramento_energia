export interface AparelhoModel {
  id: number;
  nome: string;
  tipo: string;
  potencia_min: number;
  potencia_max: number;
  consumo_total: number;
  leituras: number[]; 
}