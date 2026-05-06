import express from "express";

import { ClienteControllers } from "./Controllers/Cliente";
import { ProdutosControllers } from "./Controllers/Produtos";
import { Area_usuarioControllers } from "./Controllers/Area_usuario";
import { Forma_pagamentoControllers } from "./Controllers/Forma_pagamento";
import { itens_PedidoControllers } from "./Controllers/itens_pedido";
import { PedidoControllers } from "./Controllers/Pedido";
import { Status_PedidoControllers } from "./Controllers/Status_Pedido";

export const app = express();

app.use(express.json());

ClienteControllers();
ProdutosControllers();
Area_usuarioControllers();
Forma_pagamentoControllers();
itens_PedidoControllers();
PedidoControllers();
Status_PedidoControllers();


  

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});