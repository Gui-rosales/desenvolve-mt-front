import { Link } from 'react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonDetails } from './components/person-details-card';
import { OcorrenciaList } from './components/ocorrencia-list-card';
import { ErrorDisplay } from '@/components/error-display';
import { AddOcorrenciaModal } from './components/add-ocorrencia-modal';
import { SkipLinks } from '@/components/skip-links';
import { useDetailsController } from './use-details-controller';

export function DetailPage() {
  const {
    person,
    ocoId,
    isLoadingPerson,
    isErrorPerson,
    refetchPerson,
    ocorrencias,
    isLoadingOcorrencias,
    isErrorOcorrencias,
  } = useDetailsController();

  if (isLoadingPerson) {
    return (
      <div className="space-y-6">
        <SkipLinks />
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              aria-label="Voltar para a página inicial"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">Carregando informações...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isErrorPerson || !person) {
    return (
      <div className="space-y-6">
        <SkipLinks />
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              aria-label="Voltar para a página inicial"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
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
      <SkipLinks />
      
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link to="/">
          <Button
            variant="outline"
            size="sm"
            data-testid="back-button"
            aria-label="Voltar para a página de busca"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Voltar à busca
          </Button>
        </Link>

        {ocoId && <AddOcorrenciaModal ocoId={ocoId} />}
      </header>

      <main id="main-content">
        <PersonDetails person={person} />
      </main>

      {/* Additional Information */}
      {ocoId && (
        <section className="space-y-4" data-testid="community-info-section" aria-labelledby="community-info-heading">
          <h2 id="community-info-heading" className="text-2xl font-semibold text-foreground">
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
        </section>
      )}
    </div>
  );
}
