'use client';

import { cn } from '@/lib/utils';
import { playfair, poppins } from './fonts';
import Link from 'next/link';
import { Button } from './ui/button';

export function OkinoWorks() {
  return (
    <div className="flex items-center justify-center p-3 absolute bottom-0 w-full z-10">
      <Button asChild variant={'link'}>
        <Link href="https://okino.works">
          <span className="text-sm tracking-normal  text-muted-foreground  font-normal ">
            <span className={cn(poppins.className)}>okino</span>
            <span className={cn(playfair.className)}>wrks</span>
          </span>
        </Link>
      </Button>
    </div>
  );
}
