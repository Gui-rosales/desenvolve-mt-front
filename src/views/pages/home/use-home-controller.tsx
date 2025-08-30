import { useGetPessoasCounter } from '@/app/hooks/pessoas/get-pessoas-counter';
import { useSearchPessoas } from '@/app/hooks/pessoas/search-pessoas';
import type { searchPessoasRequest } from '@/app/services/pessoa/search-pessoas';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function useHomeController() {
  const [filters, setFilters] = useState<searchPessoasRequest>({});

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useSearchPessoas(filters);

  const { data: pessoasCounter } = useGetPessoasCounter();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearch = (newFilters: searchPessoasRequest) => {
    setFilters(newFilters);
  };

  const allPeople = data?.pages.flatMap((page) => page.content) || [];
  const totalElements = data?.pages[0]?.totalElements || 0;

  return {
    allPeople,
    totalElements,
    isLoading,
    isError,
    handleSearch,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    ref,
    inView,
    pessoasCounter,
  };
}
