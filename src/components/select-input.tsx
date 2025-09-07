import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

type SelectInputProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  placeholder?: string;
  options: Option[];
  description?: string;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
  'aria-describedby'?: string;
};

export function SelectInput<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder = 'Selecione uma opção',
  options,
  disabled = false,
  description,
  isRequired = false,
  'data-testid': dataTestId,
  'aria-describedby': ariaDescribedBy,
}: SelectInputProps<T>) {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-medium">
              {label}
              {isRequired && <span className="text-destructive ml-1" aria-label="obrigatório">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Select
              onValueChange={onChange}
              required={isRequired}
              disabled={disabled}
              {...field}
            >
              <SelectTrigger 
                className="w-full" 
                data-testid={dataTestId}
                aria-required={isRequired}
                aria-invalid={!!error}
                aria-describedby={cn(
                  description && !error ? `${name}-description` : undefined,
                  error ? `${name}-error` : undefined,
                  ariaDescribedBy
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="w-full">
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && !error && (
            <p 
              className="text-sm text-muted-foreground" 
              id={`${name}-description`}
            >
              {description}
            </p>
          )}
          <FormMessage 
            id={`${name}-error`}
          >
            {error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
}
