import { pessoasHandlers } from './pessoas';
import { ocorrenciasHandlers } from './ocorrencias';

export const handlers = [...pessoasHandlers, ...ocorrenciasHandlers];
