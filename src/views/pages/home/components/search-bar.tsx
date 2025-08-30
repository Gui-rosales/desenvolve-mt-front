'use client';

import type React from 'react';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { searchPessoasRequest } from '@/app/services/pessoa/search-pessoas';

interface SearchBarProps {
  onSearch: (filters: searchPessoasRequest) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<searchPessoasRequest>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      ...filters,
      nome: searchTerm.trim() || undefined,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Digite o nome da pessoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
              disabled={isLoading}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4"
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="px-8"
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="font-medium text-foreground">Filtros avançados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Sexo
                </label>
                <select
                  value={filters.sexo || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sexo: e.target.value as
                        | 'MASCULINO'
                        | 'FEMININO'
                        | undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="">Todos</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Idade Inicial
                </label>
                <Input
                  type="number"
                  placeholder="Idade"
                  value={filters.faixaIdadeInicial?.toString() || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      faixaIdadeInicial: e.target.value
                        ? Number.parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Idade Final
                </label>
                <Input
                  type="number"
                  placeholder="Idade"
                  value={filters.faixaIdadeFinal?.toString() || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      faixaIdadeFinal: e.target.value
                        ? Number.parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Status
                </label>
                <select
                  value={filters.status?.toString() || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      status: e.target.value as 'DESAPARECIDO' | 'LOCALIZADO',
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="">Todos</option>
                  <option value="LOCALIZADO">Localizada</option>
                  <option value="DESAPARECIDO">Desaparecida</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
