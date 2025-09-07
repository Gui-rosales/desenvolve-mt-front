import { Loader2, Users, Heart } from 'lucide-react';
import { SearchBar } from './components/search-bar';
import { PersonCard } from '@/components/person-card';
import { SkeletonCard } from '@/components/skeleton-card';
import { ErrorDisplay } from '@/components/error-display';
import { SkipLinks } from '@/components/skip-links';
import { useHomeController } from './use-home-controller';

export function HomePage() {
  const {
    allPeople,
    totalElements,
    isLoading,
    isError,
    handleSearch,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    ref,
    pessoasCounter,
  } = useHomeController();

  if (isError) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Pessoas Desaparecidas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema de consulta da Polícia Civil de Mato Grosso
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <ErrorDisplay
          message="Erro ao carregar a lista de pessoas. Verifique sua conexão e tente novamente."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SkipLinks />
      
      {/* Hero Section */}
      <header className="text-center space-y-6 py-8" id="main-content">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center" aria-hidden="true">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
          Pessoas Desaparecidas
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Sistema de consulta da Polícia Civil de Mato Grosso para busca e
          registro de informações sobre pessoas desaparecidas
        </p>

        <div className="flex items-center justify-center gap-8 pt-4" role="region" aria-label="Estatísticas de pessoas desaparecidas">
          <div className="text-center" data-testid="desaparecidos-counter">
            <div className="text-2xl font-bold text-primary" aria-label={`${pessoasCounter?.quantPessoasDesaparecidas.toLocaleString()} pessoas desaparecidas`}>
              {pessoasCounter?.quantPessoasDesaparecidas.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Pessoas Desaparecidas
            </div>
          </div>
          <div className="text-center" data-testid="encontrados-counter">
            <div className="text-2xl font-bold text-primary" aria-label={`${pessoasCounter?.quantPessoasEncontradas.toLocaleString()} pessoas encontradas`}>
              {pessoasCounter?.quantPessoasEncontradas.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Pessoas Encontradas
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section id="search-section" aria-labelledby="search-heading">
        <h2 id="search-heading" className="sr-only">Busca de pessoas desaparecidas</h2>
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </section>

      {/* Results Section */}
      <section id="results-section" className="space-y-6" aria-labelledby="results-heading">
        <h2 id="results-heading" className="sr-only">Resultados da busca</h2>
        {isLoading && allPeople.length === 0 ? (
          <div className="space-y-4" role="status" aria-live="polite">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" aria-hidden="true" />
              <p className="text-muted-foreground mt-2">Carregando...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-label="Carregando resultados">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        ) : allPeople.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <span className="text-muted-foreground" aria-live="polite">
                  {allPeople.length} de {totalElements.toLocaleString()}{' '}
                  resultados
                </span>
              </div>
            </div>

            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              data-testid="person-grid"
              role="grid"
              aria-label="Lista de pessoas desaparecidas"
            >
              {allPeople.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div
              ref={ref}
              className="flex justify-center py-8"
              role="status"
              aria-live="polite"
            >
              {isFetchingNextPage && (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    Carregando mais resultados...
                  </span>
                </div>
              )}
              {!hasNextPage && allPeople.length > 0 && (
                <p className="text-muted-foreground">
                  Todos os resultados foram carregados
                </p>
              )}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-12" role="status" aria-live="polite">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros de busca ou use termos diferentes
              </p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
