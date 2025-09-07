import { useRegisterOcorrencia } from '@/app/hooks/ocorrencias/register-ocorrencia';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ocorrenciaSchema, type OcorrenciaFormData } from './schema';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddOcorrenciaModalController({ ocoId }: { ocoId: number }) {
  const [open, setOpen] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const mutation = useRegisterOcorrencia();

  const queryClient = useQueryClient();

  const form = useForm<OcorrenciaFormData>({
    defaultValues: {
      descricao: 'Informação adicionada pela comunidade',
    },
    resolver: zodResolver(ocorrenciaSchema),
  });

  const submitData = form.handleSubmit(async (data: OcorrenciaFormData) => {
    try {
      const formData = new FormData();

      for (const file of files) {
        formData.append('files', file);
      }

      await mutation.mutateAsync({
        ocoId,
        informacao: data.informacao,
        files: formData,
        descricao: data.descricao,
        data: data.data.toISOString().split('T')[0], // yyyy-mm-dd
      });

      form.reset();
      setFiles([]);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['get-ocorrencias', ocoId] });
      toast.success('Informação registrada com sucesso');
    } catch (error: any) {
      console.error('Erro ao registrar ocorrência:', error);
      toast.error('Erro ao registrar ocorrência' + error.message);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    open,
    setOpen,
    dateModal,
    setDateModal,
    files,
    setFiles,
    submitData,
    handleFileChange,
    removeFile,
    form,
    mutation,
  };
}
