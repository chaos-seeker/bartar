import { cn } from '@/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-semibold text-gray-900">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full border-0 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 transition-colors focus:ring-2 focus:ring-primary focus:outline-none',
            error && 'ring-2 ring-red-500',
            className,
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
