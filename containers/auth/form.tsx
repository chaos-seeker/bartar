'use client';

import { Controller, useForm } from 'react-hook-form';
import { FormInput } from '@/components/form-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@/components/loading';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Form = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    // handle login here
    console.log(values);
  };

  return (
    <section className="container flex h-dvh items-center justify-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-sm space-y-4 border border-gray-200 p-4"
      >
        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormInput
              label="Username"
              placeholder="Enter your username"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-primary mt-2 w-full rounded-md px-4 py-3 font-semibold text-white transition-colors disabled:opacity-60"
        >
          {form.formState.isSubmitting ? (
            <Loading className="[&_span]:bg-white" />
          ) : (
            'Login'
          )}
        </button>
      </form>
    </section>
  );
};
