'use client';

import type React from 'react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronDownIcon, Plus, Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRegisterOcorrencia } from '@/app/hooks/ocorrencias/register-ocorrencia';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const ocorrenciaSchema = z.object({
  informacao: z
    .string()
    .min(10, 'A informação deve ter pelo menos 10 caracteres'),
  descricao: z.string().min(5, 'A descrição da informação é obrigatória'),
  data: z.date({
    error: 'Uma data de avistamento é necessário',
  }),
  // .refine((data) => {
  //   if (!data.match(/^\d{4}-\d{2}-\d{2}$/)) {
  //     return 'Formato de data inválida';
  //   }

  //   if (data) {
  //     const [year, month, day] = data.split('-').map(Number);
  //     const isValidDate = !isNaN(year) && !isNaN(month) && !isNaN(day);
  //     return isValidDate || 'Data inválida';
  //   }
  //   return 'Data inválida';
  // }),
});

type OcorrenciaFormData = z.infer<typeof ocorrenciaSchema>;

interface AddOcorrenciaModalProps {
  ocoId: number;
}

export function AddOcorrenciaModal({ ocoId }: AddOcorrenciaModalProps) {
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

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Registrar Informação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Nova Informação</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="informacao">Descrição da Informação *</Label>
            <Textarea
              id="informacao"
              placeholder="Descreva qualquer informação relevante que possa ajudar na localização..."
              className="min-h-[120px]"
              {...register('descricao')}
            />
            {errors.descricao && (
              <p className="text-sm text-destructive">
                {errors.descricao.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="informacao">
              Informação sobre a pessoa desaparecida *
            </Label>
            <Textarea
              id="informacao"
              placeholder="Descreva qualquer informação relevante que possa ajudar na localização..."
              className="min-h-[120px]"
              {...register('informacao')}
            />
            {errors.informacao && (
              <p className="text-sm text-destructive">
                {errors.informacao.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="date"
              className="px-1"
            >
              Data de avistamento
            </Label>
            <Popover
              open={dateModal}
              onOpenChange={setDateModal}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {getValues('data')
                    ? getValues('data').toLocaleDateString()
                    : 'Seleciona uma data'}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={getValues('data')}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    // if (!date) return;
                    setValue('data', date!);
                    setDateModal(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {errors.informacao && (
              <p className="text-sm text-destructive">
                {errors.informacao.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Label>Anexos (opcional)</Label>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Clique para selecionar arquivos
                </span>
                <span className="text-xs text-muted-foreground">
                  Imagens, PDF, DOC (máx. 10MB cada)
                </span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Arquivos selecionados:</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Enviando...' : 'Registrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
