import { Link } from 'react-router';

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <nav aria-label="Navegação rápida">
        <ul className="flex flex-col gap-2 p-4 bg-background border border-border rounded-md shadow-lg">
          <li>
            <Link
              to="#main-content"
              className="block px-4 py-2 text-sm font-medium text-foreground bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Pular para o conteúdo principal
            </Link>
          </li>
          <li>
            <Link
              to="#search-section"
              className="block px-4 py-2 text-sm font-medium text-foreground bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Pular para a busca
            </Link>
          </li>
          <li>
            <Link
              to="#results-section"
              className="block px-4 py-2 text-sm font-medium text-foreground bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Pular para os resultados
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
