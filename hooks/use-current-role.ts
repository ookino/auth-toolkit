import { useSession } from 'next-auth/react';

export const useCurrentRole = () => {
  const sesssion = useSession();

  return sesssion.data?.user.role;
};
