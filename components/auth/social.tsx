import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
export function Social() {
  async function onClick(provider: 'google' | 'github') {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant={'outline'}
        onClick={() => signIn('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        size="lg"
        className="w-full"
        variant={'outline'}
        onClick={() => signIn('github')}
      >
        <FaGithub className="h-4 w-4" />
      </Button>
    </div>
  );
}
