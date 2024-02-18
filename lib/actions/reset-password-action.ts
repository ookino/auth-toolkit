'use server';
import * as z from 'zod';
import { db } from '../db';
import { ResetPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '../services/password-reset-service';
import { getUserByEmail } from '../services/user-service';
import bcrypt from 'bcryptjs';
export async function resetPassword(
  values: z.infer<typeof ResetPasswordSchema>,
  token: string | null
) {
  if (!token) {
    return { error: 'Missing token  ' };
  }
  const validatedEntries = ResetPasswordSchema.safeParse(values);

  if (!validatedEntries.success) {
    return { error: 'Invailid entries' };
  }

  const { password } = validatedEntries.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: 'Invalid Token' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exsist' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return { success: 'Password updated successfully' };
}
