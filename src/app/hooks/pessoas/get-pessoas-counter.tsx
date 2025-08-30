import { pessoaService } from '@/app/services/pessoa';
import { useQuery } from '@tanstack/react-query';

export function useGetPessoasCounter() {
  return useQuery({
    queryKey: ['pessoas-counter'],
    queryFn: () => pessoaService.getPessoasCounter(),
  });
}
