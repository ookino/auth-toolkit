'use client';

import { UserRole } from '@prisma/client';
import { FormAlert } from '../form-alert';
import { useCurrentRole } from '@/hooks/use-current-role';

interface RoleGuardProps {
  children: React.ReactNode;
  permittedRole: UserRole;
}

export function RoleGuard({ children, permittedRole }: RoleGuardProps) {
  const role = useCurrentRole();
  if (role !== permittedRole) {
    return (
      <FormAlert
        status="error"
        message="You do not have access to this resource"
      />
    );
  }

  return <>{children}</>;
}
