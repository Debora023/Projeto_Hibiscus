import { app } from "../server";
import { Status_PedidoRepository } from "../Repositories/status_pedido";

export function Status_PedidoControllers() {
  const repository = new Status_PedidoRepository();

  app.get("/Status-Pedido", (req, res) => {
    const { codigo } = req.query;

    if (codigo) {
      const StatusPedido = repository.buscarPorCodigo(
        codigo as "pendente" | "pago" | "separação" | "enviado" | "entregue" | "cancelado"
      );
      if (!StatusPedido) return res.status(404).json({ erro: "Status do pedido nao encontrado" });
      return res.json(StatusPedido);
    }

    res.json(repository.listar());
  });

  app.get("/Status-Pedido /:id", (req, res) => {
    const id = parseInt(req.params.id);
    const StatusPedido = repository.buscarPorId(id);
    if (!StatusPedido) return res.status(404).json({ erro: "Status do pedido nao encontrado" });
    res.json(StatusPedido);
  });

  app.post("/Status-Pedido", (req, res) => {
    try {
      const { codigo } = req.body;

      if (!codigo || codigo.trim().length === 0) throw new Error("Codigo e obrigatorio");

      const StatusPedido = repository.salvar({ codigo });
      res.status(201).json(StatusPedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}