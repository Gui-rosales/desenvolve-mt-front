import z from 'zod';

export const ocorrenciaSchema = z.object({
  informacao: z
    .string()
    .min(10, 'A informação deve ter pelo menos 10 caracteres'),
  descricao: z.string().min(5, 'A descrição da informação é obrigatória'),
  data: z.date({
    error: 'Uma data de avistamento é necessário',
  }),
});

export type OcorrenciaFormData = z.infer<typeof ocorrenciaSchema>;
