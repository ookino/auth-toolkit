import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RoleGuard } from '@/components/auth/role-guard';
import { FormAlert } from '@/components/form-alert';
import { UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default async function AdminPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Admin</CardTitle>
        <CardDescription>Admin access </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 tracking-tight">
          <RoleGuard permittedRole={UserRole.ADMIN}>
            <FormAlert status="success" message="You have admin privilleges" />
          </RoleGuard>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between w-full items-center">
              <span className="text-sm">Admin API Route</span>
              <Button className="text-xs font-semibold" size={'sm'}>
                <code>TEST</code>
              </Button>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between w-full items-center">
              <span className="text-sm">Admin Server Action</span>
              <Button className="text-xs font-semibold" size={'sm'}>
                <code>TEST</code>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
