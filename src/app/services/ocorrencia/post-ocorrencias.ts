import { errorHandler } from '@/app/common/error-handler';
import { api } from '../api';

export interface registerOcorrenciaRequest {
  informacao: string;
  descricao: string;
  data: string; // yyyy-mm-dd
  ocoId: number;
  files?: FormData;
}

export async function registerOcorrencia(input: registerOcorrenciaRequest) {
  try {
    const { files, ...inputData } = input;

    const { data } = await api.post(
      '/ocorrencias/informacoes-desaparecido',
      files,
      {
        params: inputData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage = errorHandler(error);
    throw new Error(errorMessage);
  }
}
