'use client';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const size = 'w-4 h-4 p-0';
  const variant = 'ghost';

  return (
    <div className="flex gap-2 items-center p-2 w-fit absolute bottom-0 left-0 rounded-tr-lg z-20 ">
      <Button variant={variant} onClick={() => setTheme('light')}>
        <Sun
          className={cn(size, theme === 'light' ? '' : 'text-muted-foreground')}
        />
      </Button>
      <Button variant={variant} onClick={() => setTheme('dark')}>
        <Moon
          className={cn(size, theme === 'dark' ? '' : 'text-muted-foreground')}
        />
      </Button>
      <Button variant={variant} onClick={() => setTheme('system')}>
        <Monitor
          className={cn(
            size,
            theme === 'system' ? '' : 'text-muted-foreground'
          )}
        />
      </Button>
    </div>
  );
}
