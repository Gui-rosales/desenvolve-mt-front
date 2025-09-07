import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <Card role="status" aria-label="Carregando informações da pessoa">
      <CardContent className="p-0">
        <Skeleton className="aspect-[3/4] w-full rounded-t-lg" aria-hidden="true" />
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" aria-hidden="true" />
            <Skeleton className="h-4 w-1/2" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" aria-hidden="true" />
            <Skeleton className="h-4 w-2/3" aria-hidden="true" />
          </div>
        </div>
        <span className="sr-only">Carregando informações da pessoa...</span>
      </CardContent>
    </Card>
  );
}
