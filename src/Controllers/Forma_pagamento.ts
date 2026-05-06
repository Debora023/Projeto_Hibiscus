import { app } from "../server";
import { Forma_pagamentoRepository } from "../Repositories/Forma_pagamento";

export function Forma_pagamentoControllers() {
  const repository = new Forma_pagamentoRepository();

  app.get("/forma-pagamento", (req, res) => {
    const { tipo_De_pagamento } = req.query;

    if (tipo_De_pagamento) {
      const formaDePagamento = repository.buscarPorTipoDePagamento(
        tipo_De_pagamento as "pix" | "Débito" | "Crédito" | "Boleto"
      );
      if (!formaDePagamento) return res.status(404).json({ erro: "Forma de pagamento nao encontrada" });
      return res.json(formaDePagamento);
    }

    res.json(repository.listar());
  });

  app.get("/forma-pagamento/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const formaDePagamento = repository.buscarPorId(id);
    if (!formaDePagamento) return res.status(404).json({ erro: "Forma de pagamento nao encontrada" });
    res.json(formaDePagamento);
  });

  app.post("/forma-pagamento", (req, res) => {
    try {
      const { tipo_De_pagamento } = req.body;

      if (!tipo_De_pagamento || tipo_De_pagamento.trim().length === 0) throw new Error("Tipo de pagamento e obrigatorio");

      const formaDePagamento = repository.salvar({ tipo_De_pagamento });
      res.status(201).json(formaDePagamento);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}