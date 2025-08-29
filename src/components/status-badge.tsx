import { getStatusColor, getStatusText } from '@/lib/utils';
import { Badge } from './ui/badge';
import type { pessoaModel } from '@/app/models/pessoa';

interface StatusBadgeProps {
  person: pessoaModel;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ person, size = 'md' }: StatusBadgeProps) {
  const statusText = getStatusText(person);
  const statusColor = getStatusColor(person);

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  return (
    <Badge className={`${statusColor} ${sizeClasses[size]}`}>
      {statusText}
    </Badge>
  );
}
