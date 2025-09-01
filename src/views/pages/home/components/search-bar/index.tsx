import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { searchPessoasRequest } from '@/app/services/pessoa/search-pessoas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { searchBarSchema, type SearchBarSchema } from './schema';
import { TextInput } from '@/components/text-input';
import { SelectInput } from '@/components/select-input';
import { Form } from '@/components/ui/form';

interface SearchBarProps {
  onSearch: (filters: searchPessoasRequest) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const form = useForm<SearchBarSchema>({
    resolver: zodResolver(searchBarSchema),
    defaultValues: {
      nome: '',
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: undefined,
      status: undefined,
    },
  });

  const handleSubmitForm = form.handleSubmit((data) => {
    onSearch({
      ...data,
    });
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={handleSubmitForm}
          className="space-y-4"
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <TextInput
                control={form.control}
                name="nome"
                placeholder="Digite o nome da pessoa..."
                disabled={isLoading}
                data-testid="search-input"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4"
              data-testid="filter-toggle-button"
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="px-8"
              data-testid="search-button"
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
                  <SelectInput
                    name="sexo"
                    control={form.control}
                    options={[
                      { label: 'Masculino', value: 'MASCULINO' },
                      { label: 'Feminino', value: 'FEMININO' },
                    ]}
                    placeholder="Selecione o sexo"
                    disabled={isLoading}
                    data-testid="sexo-select"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Idade Inicial
                  </label>
                  <TextInput
                    control={form.control}
                    name="faixaIdadeInicial"
                    placeholder="Idade"
                    type="number"
                    disabled={isLoading}
                    data-testid="idade-inicial-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Idade Final
                  </label>
                  <TextInput
                    control={form.control}
                    name="faixaIdadeFinal"
                    placeholder="Idade"
                    type="number"
                    disabled={isLoading}
                    data-testid="idade-final-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Status
                  </label>
                  <SelectInput
                    name="status"
                    control={form.control}
                    options={[
                      { label: 'Localizada', value: 'LOCALIZADO' },
                      { label: 'Desaparecida', value: 'DESAPARECIDO' },
                    ]}
                    placeholder="Selecione o status"
                    disabled={isLoading}
                    data-testid="status-select"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
