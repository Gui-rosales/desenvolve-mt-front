import { faker } from '@faker-js/faker/locale/pt_BR';

// Configurar seed para testes consistentes
if (process.env.NODE_ENV === 'test') {
  faker.seed(12345);
}

export { faker };
