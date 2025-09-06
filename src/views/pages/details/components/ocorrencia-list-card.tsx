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
      <Card>
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
            <FileText className="w-5 h-5" />
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
          <FileText className="w-5 h-5" />
          Informações Adicionais ({ocorrencias.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ocorrencias.map((ocorrencia) => (
          <div
            key={ocorrencia.id}
            className="border border-border rounded-lg p-4 space-y-3"
            data-testid="ocorrencia-item"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(ocorrencia.data)}</span>
            </div>

            <p className="text-foreground leading-relaxed">
              {ocorrencia.informacao}
            </p>

            {ocorrencia.anexos && ocorrencia.anexos.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Paperclip className="w-4 h-4" />
                  <span>Anexos ({ocorrencia.anexos.length})</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {ocorrencia.anexos.map((anexo, index) => (
                    <a
                      key={index}
                      href={anexo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 border border-border rounded hover:bg-accent transition-colors"
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
