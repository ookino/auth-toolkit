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
import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormAlert } from '../form-alert';
import { login } from '@/lib/actions/login-action';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { error } from 'console';
import { Suspense } from 'react';
import { TwoFactorForm } from './2fa-form';
interface Status {
  type?: 'error' | 'success';
  message?: string;
}

export function LoginForm() {
  const params = useSearchParams();
  const urlError =
    params.get('error') === 'OAuthAccountNotLinked'
      ? { type: 'error', message: 'Email is already linked to another account' }
      : {};
  const [pending, transition] = useTransition();
  const [status, setStatus] = useState<Status>({});
  const [show2FA, setShow2FA] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setStatus({});
    transition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setStatus({ type: 'error', message: data.error });
          }
          if (data?.success) {
            form.reset();
            setStatus({ type: 'success', message: data.success });
          }
          if (data?.twoFactor) {
            setShow2FA(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setStatus({
            type: 'error',
            message: 'Something went wrong',
          });
        });
    });
  }

  return (
    <Suspense>
      <CardWrapper
        headerLabel="Welcome back"
        subheaderLabel="Login to your Account"
        backButtonHref="/register"
        backButtonLabel="Don't have any account ?"
        showSocial
        on2FA={show2FA}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
            <div className="space-y-4">
              {!show2FA && (
                <>
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
                        <div className="flex justify-between items-center w-full">
                          <FormLabel>Password</FormLabel>
                          <Button
                            className=" text-muted-foreground p-0"
                            size={'sm'}
                            variant={'link'}
                            asChild
                          >
                            <Link href={'/auth/forgot-password'}>
                              Forgot password ?
                            </Link>
                          </Button>
                        </div>

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
                </>
              )}
              {show2FA && (
                <TwoFactorForm control={form.control} isPending={pending} />
              )}
            </div>
            {status.type && (
              <FormAlert status={status.type} message={status.message} />
            )}
            {!status.type && urlError.type && (
              <FormAlert
                status={urlError.type as 'error' | 'success'}
                message={urlError.message}
              />
            )}

            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={pending}>
                {show2FA ? 'Confirm' : 'Login'}
              </Button>

              {show2FA && (
                <Button
                  variant={'link'}
                  size={'sm'}
                  onClick={() => setShow2FA(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardWrapper>
    </Suspense>
  );
}
