import type { ocorrenciaModel } from '@/app/models/ocorrencia';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Calendar, FileText, Paperclip } from 'lucide-react';

interface OcorrenciaListProps {
  ocorrencias: ocorrenciaModel[];
  isLoading?: boolean;
}

export function OcorrenciaList({
  ocorrencias,
  isLoading,
}: OcorrenciaListProps) {
  if (isLoading) {
    return (
      <Card
        role="status"
        aria-live="polite"
      >
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Carregando informações...</p>
        </CardContent>
      </Card>
    );
  }

  if (!ocorrencias || ocorrencias.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText
              className="w-5 h-5"
              aria-hidden="true"
            />
            Informações Adicionais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nenhuma informação adicional disponível.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText
            className="w-5 h-5"
            aria-hidden="true"
          />
          Informações Adicionais ({ocorrencias.length})
        </CardTitle>
      </CardHeader>
      <CardContent
        className="space-y-4"
        role="list"
        aria-label="Lista de informações adicionais"
      >
        {ocorrencias.map((ocorrencia) => (
          <div
            key={ocorrencia.id}
            className="border border-border rounded-lg p-4 space-y-3"
            data-testid="ocorrencia-item"
            role="listitem"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar
                className="w-4 h-4"
                aria-hidden="true"
              />
              <time dateTime={ocorrencia.data}>
                {formatDate(ocorrencia.data)}
              </time>
            </div>

            <p className="text-foreground leading-relaxed">
              {ocorrencia.informacao}
            </p>

            {ocorrencia.anexos && ocorrencia.anexos.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Paperclip
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                  <span>Anexos ({ocorrencia.anexos.length})</span>
                </div>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                  role="list"
                  aria-label="Lista de anexos"
                >
                  {ocorrencia.anexos.map((anexo, index) => (
                    <a
                      key={index}
                      href={anexo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 border border-border rounded hover:bg-accent transition-colors"
                      role="listitem"
                      aria-label={`Abrir anexo ${index + 1} em nova aba`}
                    >
                      <span className="text-sm text-primary hover:underline">
                        Anexo {index + 1}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
