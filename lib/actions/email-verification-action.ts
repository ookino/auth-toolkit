'use server';

import { error } from 'console';
import { db } from '../db';
import { getUserByEmail } from '../services/user-service';
import { getVerificationTokenByToken } from '../services/verification-service';

/**
 * Verifies the email associated with a verification token.
 * @param {string} token - The verification token to verify the email.
 * @returns {Promise<{ success?: string, error?: string }>} An object indicating the success or error of the verification process.
 * If successful, returns an object with a 'success' property containing a success message.
 * If an error occurs, returns an object with an 'error' property containing an error message.
 */
export async function verifyEmail(token: string) {
  try {
    // Retrieve the verification token from the database
    const existingToken = await getVerificationTokenByToken(token);

    // Check if the token exists
    if (!existingToken) {
      return { error: 'Token does not exist' };
    }

    // Check if the token has expired
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: 'Token has expired' };
    }

    // Retrieve the user associated with the email from the database
    const existingUser = await getUserByEmail(existingToken.email);

    // Check if the user exists
    if (!existingUser) {
      return { error: 'Email does not exist' };
    }

    // Update the user's email verification status in the database
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    // Delete the verification token from the database
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    // Return success message
    return { success: 'Email verified' };
  } catch (error) {
    // If any error occurs during the verification process, return an error message
    return { error: 'An error occurred while verifying the email' };
  }
}
