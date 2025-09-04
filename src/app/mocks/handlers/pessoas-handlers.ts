import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/pt_BR';

faker.seed(12345);

const BASE_URL = `${import.meta.env.VITE_API_URL}/pessoas`;

function generateFakePessoasResponse(params: any) {
  const pessoas = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    nome: faker.person.fullName(),
    idade: faker.number.int({ min: 1, max: 90 }),
    sexo: faker.helpers.arrayElement(['MASCULINO', 'FEMININO']),
    urlFoto: faker.image.avatar(),
    ultimaOcorrencia: {
      ocoId: faker.number.int({ min: 1000, max: 9999 }),
      dtDesaparecimento: faker.date.past().toISOString(),
      localDesaparecimentoConcat:
        faker.location.city() + ', ' + faker.location.state(),
      dataLocalizacao: faker.helpers.maybe(() =>
        faker.date.recent().toISOString()
      ),
      ocorrenciaEntrevDesapDTO: {
        informacao: faker.lorem.paragraph(),
        vestimentasDesaparecido: faker.lorem.sentence(),
      },
      listaCartaz: Array.from(
        { length: faker.number.int({ min: 0, max: 3 }) },
        () => ({
          urlCartaz: faker.image.url(),
          tipoCartaz: faker.helpers.arrayElement([
            'Cartaz Principal',
            'Cartaz Secundário',
          ]),
        })
      ),
    },
  }));

  return {
    content: pessoas,
    totalElements: 150,
    totalPages: 13,
    size: 12,
    number: params.pagina || 0,
    last: false,
  };
}

function generateFakePessoa(id: number) {
  return {
    id,
    nome: faker.person.fullName(),
    idade: faker.number.int({ min: 1, max: 90 }),
    sexo: faker.helpers.arrayElement(['MASCULINO', 'FEMININO']),
    urlFoto: faker.image.avatar(),
    ultimaOcorrencia: {
      ocoId: faker.number.int({ min: 1000, max: 9999 }),
      dtDesaparecimento: faker.date.past().toISOString(),
      localDesaparecimentoConcat:
        faker.location.city() + ', ' + faker.location.state(),
      dataLocalizacao: faker.helpers.maybe(() =>
        faker.date.recent().toISOString()
      ),
      ocorrenciaEntrevDesapDTO: {
        informacao: faker.lorem.paragraph(),
        vestimentasDesaparecido: faker.lorem.sentence(),
      },
      listaCartaz: Array.from(
        { length: faker.number.int({ min: 0, max: 3 }) },
        () => ({
          urlCartaz: faker.image.url(),
          tipoCartaz: faker.helpers.arrayElement([
            'Cartaz Principal',
            'Cartaz Secundário',
          ]),
        })
      ),
    },
  };
}

export const pessoasHandlers = [
  http.get(`${BASE_URL}/aberto/estatistico`, () => {
    return HttpResponse.json({
      quantPessoasDesaparecidas: 150,
      quantPessoasEncontradas: 89,
    });
  }),

  http.get(`${BASE_URL}/aberto/filtro`, ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    return HttpResponse.json(generateFakePessoasResponse(params));
  }),

  http.get(`${BASE_URL}/:id`, ({ params }) => {
    const id = Number(params.id);
    return HttpResponse.json(generateFakePessoa(id));
  }),
];
