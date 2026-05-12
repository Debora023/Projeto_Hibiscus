import db from "../database/database";
import { Cupons } from "../model/Cupons";

export class CuponsRepository {

  salvar( cupons: Cupons): Cupons {
    const resultado = db
      .prepare("INSERT INTO Cupons (codigo) VALUES (?)")
      .run(cupons.codigo);

    return {
      id: Number(resultado.lastInsertRowid),
      codigo: cupons.codigo
      
    };
  }

  listar(): Cupons[] {
    return db
      .prepare("SELECT * FROM Cupons")
      .all() as Cupons[];
  }

  buscarPorId(id: number): Cupons | null {
    return (
      db
        .prepare("SELECT * FROM Cupons WHERE id = ?")
        .get(id) as Cupons
    ) ?? null;
  }

  buscarPorCodigo(codigo: string): Cupons | null {
    return (
      db
        .prepare("SELECT * FROM Cupons WHERE codigo = ?")
        .get(codigo) as Cupons
    ) ?? null;
  }
}