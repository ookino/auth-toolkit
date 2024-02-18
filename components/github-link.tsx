'use client';

import { cn } from '@/lib/utils';
import { playfair, poppins } from './fonts';
import Link from 'next/link';
import { Button } from './ui/button';

import { FaGithubAlt } from 'react-icons/fa';
export function GithubLink() {
  return (
    <div className="flex items-center justify-end p-2 absolute bottom-0 right-0 w-fit">
      <Button asChild variant={'link'}>
        <Link href="https://okino.works">
          <FaGithubAlt className="text-muted-foreground w-6 h-6" />
        </Link>
      </Button>
    </div>
  );
}
