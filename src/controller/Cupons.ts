import { app } from "../server";
import { CuponsRepository } from "../repositories/CuponsRepository";

export function ClienteController() {
  const repository = new CuponsRepository();

  app.get("/Cupons", (req, res) => {
    const { codigo } = req.query;

    if (codigo) {
      const Cupons = repository.buscarPor(codigo as string);
      if (!Cupons) return res.status(404).json({ erro: "Código invalido" });
      return res.json(Cupons);
    }

    res.json(repository.listar());
  });

  app.get("/Cupons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const Cupons = repository.buscarPorId(id);
    if (!Cupons) return res.status(404).json({ erro: "Cupom não encontrado" });
    res.json(Cupons);
  });

  app.post("/Cupons", (req, res) => {
    try {
      const {codigo} = req.body;

      if (!codigo || codigo.trim().length === 0) throw new Error("Código é obrigatório");
      if (!codigo || !codigo.includes("@")) throw new Error("Código inválido");

      const Cupons = repository.salvar({ codigo });
      res.status(201).json(Cupons);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}