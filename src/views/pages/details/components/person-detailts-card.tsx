import type { pessoaModel } from '@/app/models/pessoa';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, getStatusColor, getStatusText } from '@/lib/utils';
import { Calendar, MapPin, User, FileText, ImageIcon } from 'lucide-react';

interface PersonDetailsProps {
  person: pessoaModel;
}

export function PersonDetails({ person }: PersonDetailsProps) {
  const statusText = getStatusText(person);
  const statusColor = getStatusColor(person);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                <img
                  src={
                    person.urlFoto ||
                    '/placeholder.svg?height=600&width=450&query=person'
                  }
                  alt={`Foto de ${person.nome}`}
                  className="w-full h-full object-cover"
                  // onError={(e) => {
                  //   const target = e.target as HTMLImageElement;
                  //   target.src = '/diverse-group.png';
                  // }}
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-foreground">
                    {person.nome}
                  </h1>
                  <Badge className={`${statusColor} text-base px-4 py-2`}>
                    {statusText}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>
                      <strong>Idade:</strong> {person.idade} anos
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>
                      <strong>Sexo:</strong> {person.sexo}
                    </span>
                  </div>
                </div>
              </div>

              {person.ultimaOcorrencia && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Informações do Desaparecimento
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span>
                        <strong>Data do desaparecimento:</strong>{' '}
                        {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
                      </span>
                    </div>

                    {person.ultimaOcorrencia.dataLocalizacao && (
                      <div className="flex items-center gap-3 text-primary">
                        <Calendar className="w-5 h-5" />
                        <span>
                          <strong>Data da localização:</strong>{' '}
                          {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
                        </span>
                      </div>
                    )}

                    {person.ultimaOcorrencia.localDesaparecimentoConcat && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <span>
                          <strong>Local:</strong>{' '}
                          {person.ultimaOcorrencia.localDesaparecimentoConcat}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informações Adicionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                </p>
              </CardContent>
            </Card>
          )}

          {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
            .vestimentasDesaparecido && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Vestimentas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {
                    person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                      .vestimentasDesaparecido
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {person.ultimaOcorrencia?.listaCartaz &&
        person.ultimaOcorrencia.listaCartaz.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Cartazes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {person.ultimaOcorrencia.listaCartaz.map((cartaz, index) => (
                  <div
                    key={index}
                    className="space-y-2"
                  >
                    <img
                      src={cartaz.urlCartaz || '/placeholder.svg'}
                      alt={`Cartaz ${cartaz.tipoCartaz}`}
                      className="w-full aspect-[3/4] object-cover rounded-lg border border-border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/missing-person-poster.png';
                      }}
                    />
                    <p className="text-sm text-muted-foreground text-center">
                      {cartaz.tipoCartaz}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
