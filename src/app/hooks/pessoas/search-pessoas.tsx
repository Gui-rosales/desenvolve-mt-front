import { pessoaService } from '@/app/services/pessoa';
import type { searchPessoasRequest } from '@/app/services/pessoa/search-pessoas';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useSearchPessoas(input: searchPessoasRequest) {
  return useInfiniteQuery({
    queryKey: ['pessoas', input],
    queryFn: ({ pageParam = 0 }) =>
      pessoaService.searchPessoas({
        ...input,
        pagina: pageParam,
        porPagina: 12,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
}
