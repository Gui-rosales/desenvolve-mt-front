import { ocorrenciaService } from '@/app/services/ocorrencia';
import { useQuery } from '@tanstack/react-query';

export function getOcorrenciasById(id: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ['get-ocorrencias', id],
    queryFn: async () => {
      const data = await ocorrenciaService.getOcorrenciasById(id);
      data.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      return data;
    },
    enabled,
  });
}
