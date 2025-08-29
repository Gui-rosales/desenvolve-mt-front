import { errorHandler } from '@/app/common/error-handler';
import { api } from '../api';
import type { pessoasPaginatedSearch } from '@/app/models/pessoa';

export interface searchPessoasRequest {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: 'MASCULINO' | 'FEMININO';
  pagina?: number;
  porPagina?: number;
  status?: 'DESAPARECIDO' | 'LOCALIZADO';
}

export async function searchPessoas(input: searchPessoasRequest) {
  try {
    const { data } = await api.get<pessoasPaginatedSearch>('/pessoas/aberto/filtro', {
      params: input,
    });
    return data;
  } catch (error) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
