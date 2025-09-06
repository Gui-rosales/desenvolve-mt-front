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
import { Input } from '@/components/ui/input';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextInputProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  icon?: ReactNode;
  className?: string;
  format?: (value: string) => string;
  'data-testid'?: string;
};

export function TextInput<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  description,
  placeholder,
  type = 'text',
  icon,
  className,
  format,
  'data-testid': dataTestId,
  ...rest
}: TextInputProps<T>) {
  const {
    fieldState: { error, invalid },
  } = useController({ name, control, rules });

  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  {icon}
                </div>
              )}
              <Input
                placeholder={placeholder}
                type={type}
                className={cn(
                  icon ? 'pl-10' : '',
                  error && 'border-red-500 focus:ring-red-500'
                )}
                data-testid={dataTestId}
                {...rest}
                {...field}
                value={format ? format(field.value) : field.value}
              />
            </div>
          </FormControl>
          {description && !invalid && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          <FormMessage className="text-red-500 text-sm mt-1" />
        </FormItem>
      )}
    />
  );
}
