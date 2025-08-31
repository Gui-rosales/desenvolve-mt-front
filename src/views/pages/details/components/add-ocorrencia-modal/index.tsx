import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAddOcorrenciaModalController } from './use-add-ocorrencia-modal-controller';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, Plus, Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Form } from '@/components/ui/form';
import { TextareaInput } from '@/components/textarea-input';

interface AddOcorrenciaModalProps {
  ocoId: number;
}

export function AddOcorrenciaModal({ ocoId }: AddOcorrenciaModalProps) {
  const {
    open,
    setOpen,
    form,
    dateModal,
    setDateModal,
    files,
    submitData,
    handleFileChange,
    removeFile,
    mutation,
  } = useAddOcorrenciaModalController({ ocoId });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Registrar Informação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Nova Informação</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={submitData}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="informacao">Descrição da Informação *</Label>
              <TextareaInput
                name="descricao"
                control={form.control}
                placeholder="Descreva qualquer informação relevante que possa ajudar na localização..."
                className="min-h-[120px]"
              />
              {/* <Textarea
                id="informacao"
                placeholder="Descreva qualquer informação relevante que possa ajudar na localização..."
                className="min-h-[120px]"
                {...register('descricao')}
              />
              {errors.descricao && (
                <p className="text-sm text-destructive">
                  {errors.descricao.message}
                </p>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="informacao">
                Informação sobre a pessoa desaparecida *
              </Label>
              <TextareaInput
                name="informacao"
                control={form.control}
                placeholder="Descreva qualquer informação relevante que possa ajudar na localização..."
                className="min-h-[120px]"
              />
              {/* <Textarea
                id="informacao"
                placeholder="Descreva qualquer informação relevante que possa ajudar na localização..."
                className="min-h-[120px]"
                {...register('informacao')}
              />
              {errors.informacao && (
                <p className="text-sm text-destructive">
                  {errors.informacao.message}
                </p>
              )} */}
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
                    {form.getValues('data')
                      ? form.getValues('data').toLocaleDateString()
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
                    selected={form.getValues('data')}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      // if (!date) return;
                      form.setValue('data', date!);
                      setDateModal(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.data && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.data.message}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
