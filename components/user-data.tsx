import { ExtendedUser } from '@/next.auth';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from './ui/card';
import { Badge } from './ui/badge';

interface UserDataProps {
  user?: ExtendedUser;
  label: string;
  description?: string;
}

export function UserData({ user, label, description }: UserDataProps) {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          <Bar label={'ID'} value={user?.id as string} />
          <Bar label={'Name'} value={user?.name as string} />
          <Bar label={'Email'} value={user?.email as string} />
          <Bar label={'Role'} value={user?.role as string} />
          <div className="flex py-2 px-2 text-sm bg-secondary rounded-md justify-between items-center ">
            <p>Two Factor Authentication</p>

            <Badge variant={user?.is2FAEnabled ? 'success' : 'destructive'}>
              <code className="">
                {user?.is2FAEnabled ? 'ENABLED' : 'DISABLED'}
              </code>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Bar({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex py-2 px-2 text-sm bg-secondary rounded-md justify-between items-center">
      <p>{label}</p>
      <code className=" py-1 px-2 rounded-md text-xs">{value}</code>
    </div>
  );
}
