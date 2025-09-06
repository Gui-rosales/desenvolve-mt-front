import type { pessoaModel } from '@/app/models/pessoa';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, getStatusColor, getStatusText } from '@/lib/utils';
import { Calendar, MapPin, User, FileText, ImageIcon, Shirt } from 'lucide-react';

interface PersonDetailsProps {
  person: pessoaModel;
}

export function PersonDetails({ person }: PersonDetailsProps) {
  const statusText = getStatusText(person);
  const statusColor = getStatusColor(person);

  return (
    <div className="space-y-6" data-testid="person-details">
      {/* Card Principal - Informações da Pessoa */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Foto da Pessoa */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg border border-border">
                <img
                  src={
                    person.urlFoto ||
                    '/placeholder.svg?height=600&width=450&query=person'
                  }
                  alt={`Foto de ${person.nome}`}
                  className="w-full h-full object-cover"
                  data-testid="person-photo"
                />
                {/* Badge de Status sobre a foto */}
                <div className="absolute top-3 right-3">
                  <Badge className={`${statusColor} text-sm px-3 py-1`}>
                    {statusText}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Informações da Pessoa */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cabeçalho com Nome e Status */}
              <div className="border-b border-border pb-4">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {person.nome}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-lg text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span><strong>Idade:</strong> {person.idade} anos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span><strong>Sexo:</strong> {person.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino'}</span>
                  </div>
                </div>
              </div>

              {/* Informações da Última Ocorrência */}
              {person.ultimaOcorrencia && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                    Informações do Desaparecimento
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Data do Desaparecimento */}
                    <div className="border border-border rounded-lg p-4 bg-card/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">Data do Desaparecimento</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
                      </p>
                    </div>

                    {/* Local do Desaparecimento */}
                    {person.ultimaOcorrencia.localDesaparecimentoConcat && (
                      <div className="border border-border rounded-lg p-4 bg-card/30">
                        <div className="flex items-start gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="font-medium text-foreground">Local do Desaparecimento</span>
                        </div>
                        <p className="text-foreground leading-relaxed">
                          {person.ultimaOcorrencia.localDesaparecimentoConcat}
                        </p>
                      </div>
                    )}

                    {/* Data da Localização (quando aplicável) */}
                    {person.ultimaOcorrencia.dataLocalizacao && (
                      <div className="border border-primary/20 rounded-lg p-4 bg-primary/5 md:col-span-2">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="font-medium text-primary">Data da Localização</span>
                        </div>
                        <p className="text-lg font-semibold text-primary">
                          {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Adicionais e Vestimentas */}
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

          {/* Vestimentas */}
          {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
            .vestimentasDesaparecido && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="w-5 h-5" />
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

      {/* Cartazes */}
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
