import { z } from 'zod';

export const searchBarSchema = z.object({
  nome: z.string().optional(),
  faixaIdadeInicial: z
    .number()
    .optional()
    .refine((val) => val !== undefined && val < 0, {
      message: 'A idade inicial deve ser menor que 0',
    }),
  faixaIdadeFinal: z
    .number()
    .optional()
    .refine((val) => val !== undefined && val < 0, {
      message: 'A idade final deve ser menor que 0',
    }),
  sexo: z.enum(['MASCULINO', 'FEMININO']).optional(),
  status: z.enum(['DESAPARECIDO', 'LOCALIZADO']).optional(),
});

export type SearchBarSchema = z.infer<typeof searchBarSchema>;
