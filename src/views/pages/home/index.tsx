import { Loader2, Users, Heart } from 'lucide-react';
import { SearchBar } from './components/search-bar';
import { PersonCard } from '@/components/person-card';
import { SkeletonCard } from '@/components/skeleton-card';
import { ErrorDisplay } from '@/components/error-display';
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
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
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

        <div className="flex items-center justify-center gap-8 pt-4">
          <div className="text-center" data-testid="desaparecidos-counter">
            <div className="text-2xl font-bold text-primary">
              {pessoasCounter?.quantPessoasDesaparecidas.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Pessoas Desaparecidas
            </div>
          </div>
          <div className="text-center" data-testid="encontrados-counter">
            <div className="text-2xl font-bold text-primary">
              {pessoasCounter?.quantPessoasEncontradas.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Pessoas Encontradas
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Results Section */}
      <div className="space-y-6">
        {isLoading && allPeople.length === 0 ? (
          <div className="space-y-4">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground mt-2">Carregando...</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        ) : allPeople.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {allPeople.length} de {totalElements.toLocaleString()}{' '}
                  resultados
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="person-grid">
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
            >
              {isFetchingNextPage && (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
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
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros de busca ou use termos diferentes
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
