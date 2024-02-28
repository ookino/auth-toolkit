'use client';

import { logout } from '@/lib/actions/logout-action';

interface Props {
  children?: React.ReactNode;
}

export function LogoutButton({ children }: Props) {
  function onClick() {
    logout();
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
