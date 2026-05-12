import { app } from "../server";
import { CategoriaRepository } from "../Repositories/Categoria";

export function CategoriaControllers() {

  const repository = new CategoriaRepository();

  app.get("/categorias", (req, res) => {

    const { nome } = req.query;

    if (nome) {
      const categorias = repository.buscarPorNome(nome as string);

      if (categorias.length === 0) {
        return res.status(404).json({
          erro: "Categoria não encontrada"
        });
      }

      return res.json(categorias);
    }

    res.json(repository.listarCategorias());
  });

  app.get("/categorias/:id", (req, res) => {

    const id = Number(req.params.id);

    const categoria = repository.buscarPorId(id);

    if (!categoria) {
      return res.status(404).json({
        erro: "Categoria não encontrada"
      });
    }

    res.json(categoria);
  });

  app.post("/categorias", (req, res) => {

    try {

      const { nome, descricao } = req.body;

      if (!nome || nome.trim().length === 0) {
        throw new Error("Nome é obrigatório");
      }

      const categoria = repository.salvarCategoria({
        nome,
        descricao
      });

      res.status(201).json(categoria);

    } catch (err) {

      const mensagem =
        err instanceof Error ? err.message : "Erro interno";

      res.status(400).json({
        erro: mensagem
      });
    }
  });

  app.put("/categorias/:id", (req, res) => {

    try {

      const id = Number(req.params.id);

      const categoriaExiste = repository.buscarPorId(id);

      if (!categoriaExiste) {
        return res.status(404).json({
          erro: "Categoria não encontrada"
        });
      }

      const { nome, descricao } = req.body;

      if (!nome || nome.trim().length === 0) {
        throw new Error("Nome é obrigatório");
      }

      const categoriaAtualizada = repository.atualizarCategoria(id, {
        nome,
        descricao
      });

      res.json(categoriaAtualizada);

    } catch (err) {

      const mensagem =
        err instanceof Error ? err.message : "Erro interno";

      res.status(400).json({
        erro: mensagem
      });
    }
  });

  app.delete("/categorias/:id", (req, res) => {

    const id = Number(req.params.id);

    const categoria = repository.buscarPorId(id);

    if (!categoria) {
      return res.status(404).json({
        erro: "Categoria não encontrada"
      });
    }

    repository.deletarCategoria(id);

    res.status(204).send();
  });
}