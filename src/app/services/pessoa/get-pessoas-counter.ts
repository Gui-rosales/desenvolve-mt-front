import { errorHandler } from '@/app/common/error-handler';
import { api } from '../api';

interface GetPessoasCounterResponse {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

export async function getPessoasCounter() {
  try {
    const { data } = await api.get<GetPessoasCounterResponse>(
      '/pessoas/aberto/estatistico'
    );
    return data;
  } catch (error) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
