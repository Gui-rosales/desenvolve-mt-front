import { z } from 'zod';

export const searchBarSchema = z.object({
  nome: z.string().optional(),
  faixaIdadeInicial: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === '') return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    })
    .refine(
      (val) => {
        if (val === undefined) return true;
        return val >= 0;
      },
      {
        message: 'A idade inicial deve ser um número positivo',
      }
    ),
  faixaIdadeFinal: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === '') return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    })
    .refine(
      (val) => {
        if (val === undefined) return true;
        return val >= 0;
      },
      {
        message: 'A idade final deve ser um número positivo',
      }
    ),
  sexo: z.enum(['MASCULINO', 'FEMININO']).optional(),
  status: z.enum(['DESAPARECIDO', 'LOCALIZADO']).optional(),
});


export type SearchBarSchemaType = {
  nome?: string;
  faixaIdadeInicial?: string | number;
  faixaIdadeFinal?: string | number;
  sexo?: 'MASCULINO' | 'FEMININO';
  status?: 'DESAPARECIDO' | 'LOCALIZADO';
};