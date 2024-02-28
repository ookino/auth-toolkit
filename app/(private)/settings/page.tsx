import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {
  const session = await auth();
  return <div className="">{/* {JSON.stringify(session)} */}</div>;
}
