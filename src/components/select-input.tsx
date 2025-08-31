import {
    type FieldValues,
    type UseControllerProps,
    useController,
  } from 'react-hook-form';
  import {
    FormControl,
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
  }: SelectInputProps<T>) {
    const {
      field: { onChange, value },
      fieldState: { error },
    } = useController({ name, control, rules });
  
    return (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Select
            onValueChange={onChange}
            value={value}
            required={isRequired}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
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
    );
  }
  