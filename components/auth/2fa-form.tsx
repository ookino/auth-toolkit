'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Control } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
import * as z from 'zod';

interface TwoFactorFormProps {
  control: Control<z.infer<typeof LoginSchema>>;
  isPending: boolean;
}

export function TwoFactorForm({ control, isPending }: TwoFactorFormProps) {
  return (
    <FormField
      control={control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirmation code</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="000000"
              type="text"
              disabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
