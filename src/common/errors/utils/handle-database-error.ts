import { DatabaseError } from "../types/DatabaseError";
import { PrismaClientError } from "../types/PrismaClientError";
import { UniqueConstrantError } from "../types/UniqueConstrantError"

enum PrismaErros {
  UniqueConstraintFail = 'P2002',
}

export const handleDatabaseErros = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErros.UniqueConstraintFail:
      return new UniqueConstrantError(e);

    default:
      return new DatabaseError(e.message);
  }
}
