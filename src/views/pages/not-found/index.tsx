import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="text-6xl font-bold text-muted-foreground mb-4" aria-hidden="true">
            404
          </div>

          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Página não encontrada
          </h1>

          <p className="text-muted-foreground mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>

          <nav className="flex flex-col sm:flex-row gap-3 justify-center" aria-label="Navegação para páginas principais">
            <Link to="/">
              <Button className="w-full sm:w-auto" aria-label="Ir para a página inicial">
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                Página inicial
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
                aria-label="Ir para a página de busca de pessoas"
              >
                <Search className="w-4 h-4 mr-2" aria-hidden="true" />
                Buscar pessoas
              </Button>
            </Link>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}
