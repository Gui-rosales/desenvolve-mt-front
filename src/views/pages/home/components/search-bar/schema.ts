import { z } from 'zod';

export const searchBarSchema = z.object({
  nome: z.string().optional(),
  faixaIdadeInicial: z.number().optional(),
  faixaIdadeFinal: z.number().optional(),
  sexo: z.enum(['MASCULINO', 'FEMININO']).optional(),
  status: z.enum(['DESAPARECIDO', 'LOCALIZADO']).optional(),
});

export type SearchBarSchema = z.infer<typeof searchBarSchema>;
