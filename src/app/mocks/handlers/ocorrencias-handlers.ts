import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/pt_BR';

faker.seed(12345);

const BASE_URL = `${import.meta.env.VITE_API_URL}/ocorrencias`;
function generateFakeOcorrencias() {
  return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    informacao: faker.lorem.paragraph(),
    data: faker.date.recent().toISOString(),
    anexos: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.image.url()
    ),
  }));
}

export const ocorrenciasHandlers = [
  http.get(`${BASE_URL}/informacoes-desaparecido`, ({ request }) => {
    const url = new URL(request.url);
    const ocorrenciaId = url.searchParams.get('ocorrenciaId');

    if (!ocorrenciaId) {
      return HttpResponse.json(
        { error: 'ocorrenciaId é obrigatório' },
        { status: 400 }
      );
    }

    return HttpResponse.json(generateFakeOcorrencias());
  }),

  http.post(`${BASE_URL}/informacoes-desaparecido`, async ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    if (
      !params.informacao ||
      !params.descricao ||
      !params.data ||
      !params.ocoId
    ) {
      return HttpResponse.json(
        { error: 'Parâmetros obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
      id: faker.number.int({ min: 1000, max: 9999 }),
      message: 'Ocorrência registrada com sucesso',
      timestamp: new Date().toISOString(),
    });
  }),
];
