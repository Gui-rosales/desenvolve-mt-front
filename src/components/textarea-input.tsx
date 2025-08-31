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
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';

type TextareaInputProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
  description?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  format?: (value: string) => string;
};

export function TextareaInput<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  description,
  placeholder,
  icon,
  className,
  format,
  ...rest
}: TextareaInputProps<T>) {
  const {
    field: { onChange, onBlur, ref },
    fieldState: { error, invalid },
  } = useController({ name, control, rules });

  return (
    <FormItem className={className}>
      {label && <FormLabel className="text-sm font-medium">{label}</FormLabel>}
      <FormControl>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
          <Textarea
            onChange={(e) => {
              const formattedValue = format
                ? format(e.target.value)
                : e.target.value;
              onChange(formattedValue);
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            ref={ref}
            className={cn(
              icon ? 'pl-10' : '',
              error && 'border-red-500 focus:ring-red-500'
            )}
            {...rest}
          />
        </div>
      </FormControl>
      {description && !invalid && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
      <FormMessage className="text-red-500 text-sm mt-1" />
    </FormItem>
  );
}
