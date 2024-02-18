'use server';

import { ForgotPasswordSchema } from '@/schemas';
import { getUserByEmail } from '../services/user-service';
import { generatePasswordResetToken } from '../tokens';
import * as z from 'zod';
import { sendPasswordResetEmail } from '../mail';

export async function forgotPassword(
  values: z.infer<typeof ForgotPasswordSchema>
) {
  const validatedEntry = ForgotPasswordSchema.safeParse(values);

  if (!validatedEntry.success) {
    return { error: 'Invalid Email' };
  }

  const { email } = validatedEntry.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'email not found' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset password mail has been sent' };
}
