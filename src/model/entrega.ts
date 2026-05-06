export interface Sedex {
  id?: number;
  cep_origem: string;
  cep_destino: string;
  peso: number;
  largura?: number;
  altura?: number;
  comprimento?: number;
  valor_declarado?: number;
  prazo?: number;
  valor_frete?: number;
}