'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { icons } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: string;
  }[];
}

export function SettingsNav({ className, items, ...props }: SidebarNavProps) {
  const path = usePathname();

  return (
    <Card className="w-[300px]">
      <nav
        className={cn(
          'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 w-full',
          className
        )}
        {...props}
      >
        {items.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <Link href={item.href}>
              <Button
                className="w-full justify-start gap-2 text-xs"
                variant={path === item.href ? 'secondary' : 'ghost'}
              >
                <Icon className="h-[14px] w-[14px]" />

                {item.title}
              </Button>
            </Link>
          );
        })}
      </nav>
    </Card>
  );
}
