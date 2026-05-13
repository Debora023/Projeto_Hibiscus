import express from "express";
import cors from "cors";

import { ClienteControllers } from "./Controllers/Cliente";
import { ProdutosControllers } from "./Controllers/Produtos";
import { Area_usuarioControllers } from "./Controllers/Area_usuario";
import { Forma_pagamentoControllers } from "./Controllers/Forma_pagamento";
import { itens_PedidoControllers } from "./Controllers/itens_pedido";
import { PedidoControllers } from "./Controllers/Pedido";
import { Status_PedidoControllers } from "./Controllers/Status_Pedido";
import { CategoriaControllers } from "./Controllers/Categoria";

export const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas/controllers
ClienteControllers();
ProdutosControllers();
Area_usuarioControllers();
Forma_pagamentoControllers();
itens_PedidoControllers();
PedidoControllers();
Status_PedidoControllers();
CategoriaControllers();

// start server (coloque isso aqui OU em outro arquivo separado tipo server.ts)
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});