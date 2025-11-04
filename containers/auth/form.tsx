'use client';

import { Controller, useForm } from 'react-hook-form';
import { FormInput } from '@/components/form-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@/components/loading';
import toast from 'react-hot-toast';
import { loginOrRegister } from '@/app/actions/auth/login-or-register';
import { useRouter } from 'next/navigation';
import { useKillua } from 'killua';
import { userSlice } from '@/slices/user';
import { TUser } from '@/types/user';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Form = () => {
  const router = useRouter();
  const userStore = useKillua(userSlice);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });
  const onSubmit = async (values: LoginFormValues) => {
    const res = await loginOrRegister(values);
    if (!res.ok) {
      toast.error(res.error as string);
      return;
    }
    userStore.reducers.setUser(res.user as NonNullable<TUser>);
    toast.success(
      res.status === 'registered'
        ? 'registered successfully'
        : 'logged in successfully',
    );
    router.push('/');
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
              label="username"
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
              label="password"
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
            'login'
          )}
        </button>
      </form>
    </section>
  );
};
