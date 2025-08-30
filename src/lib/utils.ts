import type { pessoaModel } from '@/app/models/pessoa';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getStatusText(pessoa: pessoaModel): string {
  if (pessoa.ultimaOcorrencia.dataLocalizacao || pessoa.ultimaOcorrencia.encontradoVivo) {
    return 'Localizada';
  } else if (!pessoa.vivo) {
    return 'Falecida';
  }
  return 'Desaparecida';
}

export function getStatusColor(pessoa: pessoaModel): string {
  if (pessoa.vivo && (pessoa.ultimaOcorrencia?.encontradoVivo)) {
    return 'bg-primary text-primary-foreground';
  } else if (!pessoa.vivo) {
    return 'bg-destructive text-destructive-foreground';
  }
  return 'bg-secondary text-secondary-foreground';
}
