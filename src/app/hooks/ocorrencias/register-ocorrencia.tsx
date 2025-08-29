import { ocorrenciaService } from '@/app/services/ocorrencia';
import { useMutation } from '@tanstack/react-query';

export function useRegisterOcorrencia() {
  return useMutation({
    mutationFn: ocorrenciaService.registerOcorrencia,
  });
}
