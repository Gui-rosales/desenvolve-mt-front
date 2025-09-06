import { Link } from 'react-router';
import { Calendar, MapPin, User } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { formatDate, getStatusText, getStatusColor } from '@/lib/utils';
import type { pessoaModel } from '@/app/models/pessoa';

interface PersonCardProps {
  person: pessoaModel;
}

export function PersonCard({ person }: PersonCardProps) {
  const statusText = getStatusText(person);
  const statusColor = getStatusColor(person);

  return (
    <Link to={`/pessoa/${person.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer group p-0">
        <CardContent className="md:min-h-[525px] md:max-h-[550px] p-0">
          <div className="w-full aspect-[4/4] relative overflow-hidden rounded-t-lg">
            <img
              src={
                person.urlFoto ||
                '/placeholder.jpg?height=400&width=300&query=person'
              }
              alt={`Foto de ${person.nome}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 rounded-t-lg"
            />
            <div className="absolute top-3 right-3">
              <Badge className={statusColor}>{statusText}</Badge>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {person.nome}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{person.idade} anos</span>
                </div>
                <span>{person.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino'}</span>
              </div>
            </div>

            {person.ultimaOcorrencia && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Desaparecimento:{' '}
                    {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
                  </span>
                </div>

                {person.ultimaOcorrencia.localDesaparecimentoConcat && (
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {person.ultimaOcorrencia.localDesaparecimentoConcat}
                    </span>
                  </div>
                )}

                {person.ultimaOcorrencia.dataLocalizacao && (
                  <div className="flex items-center gap-2 text-primary">
                    <Calendar className="w-3 h-3" />
                    <span>
                      Localizada em:{' '}
                      {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
