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
import { LoginSchema, RegisterSchema } from '@/schemas';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormAlert } from '../form-alert';
import { register } from '@/lib/actions/register-action';
import { useState, useTransition } from 'react';

interface Status {
  type?: 'error' | 'success';
  message?: string;
}

export function RegisterForm() {
  const [pending, transition] = useTransition();
  const [status, setStatus] = useState<Status>({});
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    transition(() => {
      register(values).then(({ success, error }) => {
        if (success) setStatus({ type: 'success', message: success });
        if (error) setStatus({ type: 'error', message: error });
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      subheaderLabel="Register a new account"
      backButtonHref="/login"
      backButtonLabel="Already have an account"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="text"
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="'******'"
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
            <FormAlert status={status?.type} message={status.message} />
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
