import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  message = 'Ocorreu um erro ao carregar os dados. Tente novamente.',
  onRetry,
}: ErrorDisplayProps) {
  return (
    <Card 
      className="max-w-md mx-auto"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <CardContent className="p-8 text-center">
        <AlertTriangle 
          className="w-12 h-12 text-destructive mx-auto mb-4" 
          aria-hidden="true"
        />
        <h3 
          className="text-lg font-semibold text-foreground mb-2"
          id="error-title"
        >
          Erro ao carregar
        </h3>
        <p 
          className="text-muted-foreground mb-6"
          aria-describedby="error-title"
        >
          {message}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            aria-describedby="error-title"
          >
            <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
            Tentar novamente
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
