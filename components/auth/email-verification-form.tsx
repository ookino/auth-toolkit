'use client';
import { CardWrapper } from './card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { verifyEmail } from '@/lib/actions/email-verification-action';
import { FormAlert } from '../form-alert';

interface Status {
  type?: 'error' | 'success';
  message?: string;
}
export function EmailVerificationForm() {
  const params = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState<Status | undefined>();
  console.log({ status });
  const onSubmit = useCallback(() => {
    if (!token) {
      setStatus({ type: 'error', message: 'Verification token is missing' });
      return;
    }
    verifyEmail(token)
      .then((data) => {
        console.log({ data });
        if (data.error) setStatus({ type: 'error', message: data.error });
        if (data.success) setStatus({ type: 'success', message: data.success });
      })
      .catch((error) => {
        setStatus({ type: 'error', message: 'Something went wrong' });
      });
    console.log(token);
  }, [token, status?.message, status?.type]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Email Verification"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full justify-center items-center py-4 ">
        {!status && <BeatLoader />}
        {status && status.type === 'success' && (
          <FormAlert status={status?.type} message={status?.message} />
        )}
        {status && status.type === 'error' && (
          <FormAlert status={status?.type} message={status?.message} />
        )}
      </div>
    </CardWrapper>
  );
}
