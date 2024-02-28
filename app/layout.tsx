import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { OkinoWorks } from '@/components/okinoworks';
import { GithubLink } from '@/components/github-link';
import { Navbar } from '@/components/navbar';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { UserButton } from '@/components/auth/user-button';
import { Toaster } from '@/components/ui/sonner';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth Toolkit',
  description: 'Authentication & Authorization for NextJS',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex w-full  absolute top-0 border-b  p-6 text-sm justify-between ">
              <span className="flex w-full justify-between">
                <div>
                  <p className="font-bold font-mono"> AUTH TOOLKIT</p>
                  <p className="tracking-tight text-xs  text-muted-foreground">
                    {' '}
                    {
                      ' Authentication & Authorization (AuthJS) Starter for NextJS '
                    }
                  </p>
                </div>
              </span>

              <div className="flex items-center gap-6">
                <Navbar />
                <UserButton />
              </div>
            </div>
            <ModeToggle />
            <OkinoWorks />
            <GithubLink />
            <div className="w-full h-full flex justify-center items-center">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
