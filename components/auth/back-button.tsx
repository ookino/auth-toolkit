import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

interface Props {
  href: string;
  label: string;
}

export function BackButton({ label, href }: Props) {
  return (
    <Button
      variant={'link'}
      className=" w-full tracking-tight text-muted-foreground"
      size={'sm'}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
