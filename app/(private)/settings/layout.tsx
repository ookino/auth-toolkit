import { Metadata } from 'next';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { SettingsNav } from '@/components/settings-nav';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { icons } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const items = [
  {
    title: 'Account',
    href: '/settings',
    icon: 'CircleUserRound',
  },
  {
    title: 'Security',
    href: '/',
    icon: 'Fingerprint',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div>
      <div>
        <Tabs defaultValue="Account" className="w-full">
          <TabsList className="w-full justify-start">
            {items.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons];
              return (
                <TabsTrigger value={item.title}>
                  <Button variant={'ghost'} className="gap-2 text-xs">
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </Button>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="Account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="Security">Change your password here.</TabsContent>
        </Tabs>
      </div>
      <div>{children}</div>
    </div>
    // <>
    //   <div className="hidden space-y-6 px-6 py-10 pb-16 md:block">
    //     <div className="flex space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
    //       <SettingsNav items={sidebarNavItems} />

    //       {/* <div className=" h-40">
    //         <Separator orientation="vertical" />
    //       </div> */}
    //       <div className="lg:max-w-5xl">
    //         <div>
    //           <div className="">
    //             <h2 className="text-xl font-semibold tracking-tight">
    //               Account Settings
    //             </h2>
    //             <p className="text-muted-foreground text-sm">
    //               Manage your account settings and set e-mail preferences.
    //             </p>
    //           </div>
    //           <div>{children}</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
