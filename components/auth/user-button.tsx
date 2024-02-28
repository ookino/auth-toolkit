'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { LogOut, Settings } from 'lucide-react';
import { LogoutButton } from './logout-button';
import { useCurrentUser } from '@/hooks/use-current-user';
export function UserButton() {
  const user = useCurrentUser();
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={user.image || 'https://github.com/ookino.png'}
              />
              <AvatarFallback>OK</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[300px] mr-6" sideOffset={8}>
            <DropdownMenuLabel>
              <div className="flex flex-col py-2 tracking-tight font-normal">
                <span className="text-md ">Yaseer Okino</span>
                <span className="text-xs text-muted-foreground">
                  yaseerokino@outlook.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <div className="flex w-full tracking-tight  font-normal justify-between gap-4">
                <Button
                  size={'sm'}
                  variant={'outline'}
                  className="w-full gap-2 text-muted-foreground"
                >
                  <Settings className="w-4 h-4" />
                  Manage profile
                </Button>

                <LogoutButton>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    className="w-full gap-2 text-muted-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </Button>
                </LogoutButton>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
