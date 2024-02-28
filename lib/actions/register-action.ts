'use server';

import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import { db } from '../db';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '../services/user-service';
import { generateVerificationToken } from '../tokens';
import { sendVerificationEmail } from '../mail';

export async function register(values: z.infer<typeof RegisterSchema>) {
  try {
    const validatedEntries = RegisterSchema.safeParse(values);
    if (!validatedEntries.success) {
      return { error: 'Invalid entries' };
    }

    const { email, password, name } = validatedEntries.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error: 'Email already in use' };

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: 'User created' };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}
