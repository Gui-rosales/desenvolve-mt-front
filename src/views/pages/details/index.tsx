'use client';

import { useParams, Link } from 'react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonDetails } from './components/person-detailts-card';
import { useGetPessoa } from '@/app/hooks/pessoas/get-pessoas';
import { OcorrenciaList } from './components/ocorrencia-list-card';
import { ErrorDisplay } from '@/components/error-display';
import { getOcorrenciasById } from '@/app/hooks/ocorrencias/get-ocorrencia';
import { AddOcorrenciaModal } from './components/add-ocorrencia-modal';

export function DetailPage() {
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

  if (isLoadingPerson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">Carregando informações...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isErrorPerson || !person) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <ErrorDisplay
          message="Pessoa não encontrada ou erro ao carregar informações."
          onRetry={() => refetchPerson()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à busca
          </Button>
        </Link>

        {ocoId && <AddOcorrenciaModal ocoId={ocoId} />}
      </div>

      {/* Person Details */}
      <PersonDetails person={person} />

      {/* Additional Information */}
      {ocoId && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Informações da Comunidade
          </h2>
          <p className="text-muted-foreground">
            Informações adicionais fornecidas pela comunidade que podem ajudar
            na localização.
          </p>

          {isErrorOcorrencias ? (
            <ErrorDisplay message="Erro ao carregar informações adicionais." />
          ) : (
            <OcorrenciaList
              ocorrencias={ocorrencias || []}
              isLoading={isLoadingOcorrencias}
            />
          )}
        </div>
      )}
    </div>
  );
}
