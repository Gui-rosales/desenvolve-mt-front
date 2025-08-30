import { isAxiosError } from 'axios';

export function errorHandler(error: unknown): string {
  if (isAxiosError(error)) {
    if (Array.isArray(error.response?.data)) {
      let message = '';
      error.response.data.forEach((err) => {
        message += `${err}\n`;
      });
      return message;
    }

    return error.response?.data?.message || error.message;
  } else {
    if (error instanceof Error) {
      return error.message;
    }
  }

  return 'Ocorreu um erro ao processar a requisição. Tente novamente.';
}
