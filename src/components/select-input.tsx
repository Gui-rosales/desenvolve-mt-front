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
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <Select
              onValueChange={onChange}
              required={isRequired}
              disabled={disabled}
              {...field}
            >
              <SelectTrigger className="w-full" data-testid={dataTestId}>
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
            <p className="text-sm text-muted">{description}</p>
          )}
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
