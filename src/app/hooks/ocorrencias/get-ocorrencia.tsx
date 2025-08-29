import { ocorrenciaService } from '@/app/services/ocorrencia';
import { useQuery } from '@tanstack/react-query';

export function getOcorrenciasById(id: number, enabled: boolean = true) {
  return useQuery({
    queryKey: ['get-ocorrencias', id],
    queryFn: () => ocorrenciaService.getOcorrenciasById(id),
    enabled,
  });
}
