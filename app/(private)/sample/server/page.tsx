import { UserData } from '@/components/user-data';
import { currentUSer } from '@/lib/auth';

export default async function ServerPage() {
  const user = await currentUSer();
  return (
    <div>
      <UserData
        label="Server Example"
        user={user}
        description="Retrieving user data from session on a server component"
      />
    </div>
  );
}
