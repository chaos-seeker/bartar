import { cn } from '@/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const { value, type, ...rest } = props as {
      value?: string | number | readonly string[];
      type?: string;
      [key: string]: any;
    };

    const hasValueProp = Object.prototype.hasOwnProperty.call(props, 'value');
    const normalizedValue = hasValueProp ? (value ?? '') : undefined;

    const inputProps: Record<string, any> = { ...rest, type };
    if (hasValueProp) {
      inputProps.value = normalizedValue;
    }

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-semibold text-gray-900">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'focus:ring-primary w-full border-0 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-colors focus:ring-2 focus:outline-none',
            error && 'ring-2 ring-red-500',
            className,
          )}
          {...inputProps}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
