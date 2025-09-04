import { pessoasHandlers } from "./pessoas-handlers";
import { ocorrenciasHandlers } from "./ocorrencias-handlers";

export const handlers = [
  ...pessoasHandlers,
  ...ocorrenciasHandlers,
];