import express from "express";

import { ClienteController } from "./controllers/ClienteController";
import { ProdutosController } from "./controllers/ProdutosController";
import { AreausuarioController } from "./controllers/AreausuarioController";
import { FormapagamentoController } from "./controllers/FormapagamentoController";
import { itenspedidoController } from "./controllers/itenspedidoController";
import { PedidoController } from "./controllers/PedidoController";
import { statuspedidoController } from "./controllers/statuspedidoController";

export const app = express();

app.use(express.json());

ClienteController();
ProdutosController();
AreausuarioController();
FormapagamentoController();
itenspedidoController();
PedidoController();
statuspedidoController();




app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});