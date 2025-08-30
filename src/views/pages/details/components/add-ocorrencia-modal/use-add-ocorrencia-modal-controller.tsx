import { useRegisterOcorrencia } from '@/app/hooks/ocorrencias/register-ocorrencia';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ocorrenciaSchema, type OcorrenciaFormData } from './schema';

export function useAddOcorrenciaModalController({ ocoId }: { ocoId: number }) {
  const [open, setOpen] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const mutation = useRegisterOcorrencia();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<OcorrenciaFormData>({
    resolver: zodResolver(ocorrenciaSchema),
  });

  const onSubmit = async (data: OcorrenciaFormData) => {
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

      reset();
      setFiles([]);
      setOpen(false);
    } catch (error) {
      console.error('Erro ao registrar ocorrência:', error);
    }
  };

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
    onSubmit,
    handleFileChange,
    removeFile,
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    reset,
    mutation,
  };
}
