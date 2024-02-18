'use client';
import { useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export function LoginButton({ children, mode = 'redirect', asChild }: Props) {
  const router = useRouter();

  function onClick() {
    router.push('/login');
  }

  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
