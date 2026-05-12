export interface Status_Pedido{
    id?: number;
    codigo: "pendente" | "pago" | "separação" | "enviado" | "entregue" | "cancelado";
}