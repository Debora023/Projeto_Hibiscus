import db from "../database/database";
import { Status_Pedido } from "../model/status_pedido";

export class Status_PedidoRepository {
  salvar(status_pedido: Status_Pedido): Status_Pedido {
    const resultado = db
      .prepare("INSERT INTO status_pedidos (codigo) VALUES (?)")
      .run(status_pedido.codigo);

    return { id: Number(resultado.lastInsertRowid), codigo: status_pedido.codigo};
  }

  listar(): Status_Pedido[] {
    return db.prepare("SELECT * FROM Status_Pedido").all() as Status_Pedido[];
  }

  buscarPorId(id: number): Status_Pedido | null {
    return (db.prepare("SELECT * FROM Status_Pedido WHERE id = ?").get(id) as Status_Pedido) ?? null;
  }

  buscarPorCodigo(
    codigo: Status_Pedido["codigo"]
  ): Status_Pedido | null {
    return (
      db
        .prepare(
          "SELECT id, codigo AS codigo FROM Status_Pedido WHERE codigo LIKE ?"
        )
        .get(`%${codigo}%`) as Status_Pedido
    ) ?? null;
  }
}