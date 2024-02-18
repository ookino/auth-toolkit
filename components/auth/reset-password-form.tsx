'use client';

import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/schemas';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormAlert } from '../form-alert';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/actions/reset-password-action';
interface Status {
  type?: 'error' | 'success';
  message?: string;
}

export function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get('token');
  const [pending, transition] = useTransition();
  const [status, setStatus] = useState<Status>({});
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    transition(() => {
      resetPassword(values, token)
        .then(({ error, success }) => {
          if (success) setStatus({ type: 'success', message: success });
          if (error) setStatus({ type: 'error', message: error });
        })
        .catch(() => {
          setStatus({
            type: 'error',
            message: 'An error occurred while resetting password.',
          });
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Reset Password"
      subheaderLabel="Change your password"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="*****"
                      type="password"
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Passoword</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="*****"
                      type="password"
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {status.type && (
            <FormAlert status={status.type} message={status.message} />
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            Send Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
