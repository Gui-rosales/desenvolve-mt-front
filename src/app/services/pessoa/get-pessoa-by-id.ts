import { errorHandler } from '@/app/common/error-handler';
import { api } from '../api';
import type { pessoaModel } from '@/app/models/pessoa';

export async function getPessoaById(id: number) {
  try {
    const { data } = await api.get<pessoaModel>(`/pessoas/${id}`);
    return data;
  } catch (error) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
