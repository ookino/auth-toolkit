import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `http://localhost:3000/auth/email-verification?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Auth by Okino <mail@okino.works>',
      to: email,
      subject: 'Verify your email',
      html: `<p>Click  <a href="${verificationLink}">here</a> to verify email.</p>`,
    });

    console.log('data', data);
    console.log('error', error);
  } catch (error) {
    console.log(error);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const passwordResetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Auth by Okino <mail@okino.works>',
      to: email,
      subject: 'Reset your Password',
      html: `<p>Click  <a href="${passwordResetLink}">here</a> to reset your password</p>`,
    });

    console.log('data', data);
    console.log('error', error);
  } catch (error) {
    console.log(error);
  }
}

export async function sendTwoFactorTokenMail(email: string, token: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Auth by Okino <mail@okino.works>',
      to: email,
      subject: 'Confirmation Code',
      html: `<p>your confirmation code: ${token}">`,
    });

    console.log('data', data);
    console.log('error', error);
  } catch (error) {
    console.log(error);
  }
}
