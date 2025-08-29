import { pessoaService } from '@/app/services/pessoa';
import { useQuery } from '@tanstack/react-query';

export function useGetPessoa(id: number, enabled = true) {
  return useQuery({
    queryKey: ['get-pessoa', id],
    queryFn: () => pessoaService.getPessoaById(id),
    enabled,
  });
}
