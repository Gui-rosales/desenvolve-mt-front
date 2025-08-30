import { getOcorrenciasById } from '@/app/hooks/ocorrencias/get-ocorrencia';
import { useGetPessoa } from '@/app/hooks/pessoas/get-pessoas';
import { useParams } from 'react-router';

export function useDetailsController() {
  const { id } = useParams<{ id: string }>();
  const personId = id ? Number.parseInt(id) : 0;

  const {
    data: person,
    isLoading: isLoadingPerson,
    isError: isErrorPerson,
    refetch: refetchPerson,
  } = useGetPessoa(personId);

  const ocoId = person?.ultimaOcorrencia?.ocoId;

  const {
    data: ocorrencias,
    isLoading: isLoadingOcorrencias,
    isError: isErrorOcorrencias,
  } = getOcorrenciasById(ocoId || 0);

  return {
    person,
    ocoId,
    isLoadingPerson,
    isErrorPerson,
    refetchPerson,
    ocorrencias,
    isLoadingOcorrencias,
    isErrorOcorrencias,
  };
}
