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
import { ForgotPasswordSchema } from '@/schemas';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormAlert } from '../form-alert';
import { forgotPassword } from '@/lib/actions/forgot-password-action';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
interface Status {
  type?: 'error' | 'success';
  message?: string;
}

export function ForgotPasswordForm() {
  const [pending, transition] = useTransition();
  const [status, setStatus] = useState<Status>({});
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    console.log(values);
    transition(() => {
      forgotPassword(values).then(({ success, error }) => {
        if (success) setStatus({ type: 'success', message: success });
        if (error) setStatus({ type: 'error', message: error });
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Forgot Password"
      subheaderLabel="Enter you registered email address"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@example.com"
                      type="email"
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
