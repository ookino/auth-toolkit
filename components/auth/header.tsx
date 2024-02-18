import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface Props {
  label: string;
  subLabel?: string;
}

export function Header({ label, subLabel }: Props) {
  return (
    <div className="w-full flex flex-col">
      <h1
        className={cn(
          'text-3xl font-semibold tracking-tighter',
          font.className
        )}
      >
        {label}
      </h1>
      <p className="text-muted-foreground text-sm  tracking-tigh font-semibold pl-1">
        {subLabel}
      </p>
    </div>
  );
}
