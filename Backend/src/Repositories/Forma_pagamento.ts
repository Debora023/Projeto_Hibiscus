import db from "../database/database";
import { Forma_pagamento } from "../model/Forma_pagamento";

export class Forma_pagamentoRepository {
  salvar(forma_de_pagamento: Forma_pagamento): Forma_pagamento {
    const resultado = db
      .prepare("INSERT INTO forma_pagamento (tipo_de_pagamento) VALUES (?)")
      .run(forma_de_pagamento.tipo_De_pagamento);

    return {
      id: Number(resultado.lastInsertRowid),
      tipo_De_pagamento: forma_de_pagamento.tipo_De_pagamento,
    };
  }

  listar(): Forma_pagamento[] {
    return db
      .prepare(
        "SELECT id, tipo_de_pagamento AS tipo_De_pagamento FROM forma_pagamento"
      )
      .all() as Forma_pagamento[];
  }

  buscarPorId(id: number): Forma_pagamento | null {
    return (
      db
        .prepare(
          "SELECT id, tipo_de_pagamento AS tipo_De_pagamento FROM forma_pagamento WHERE id = ?"
        )
        .get(id) as Forma_pagamento
    ) ?? null;
  }

  buscarPorTipoDePagamento(
    tipo_De_pagamento: Forma_pagamento["tipo_De_pagamento"]
  ): Forma_pagamento | null {
    return (
      db
        .prepare(
          "SELECT id, tipo_de_pagamento AS tipo_De_pagamento FROM forma_pagamento WHERE tipo_de_pagamento LIKE ?"
        )
        .get(`%${tipo_De_pagamento}%`) as Forma_pagamento
    ) ?? null;
  }
}