import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import { KeyRound } from 'lucide-react';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});
export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center  bg-center bg-no-repeat bg-cover">
      <div className="space-y-2 text-center">
        <div className="py-4">
          <LoginButton>
            <Button variant="outline" className="gap-4" size={'lg'}>
              <KeyRound className="w-4 h-4" />
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
