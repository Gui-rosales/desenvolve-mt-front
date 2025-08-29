import { errorHandler } from '@/app/common/error-handler';
import { api } from '../api';
import type { ocorrenciaModel } from '@/app/models/ocorrencia';

export async function getOcorrenciasById(id: number) {
  try {
    const { data } = await api.get<ocorrenciaModel[]>(
      '/ocorrencias/informacoes-desaparecido',
      {
        params: {
          ocorrenciaId: id,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
