import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { OkinoWorks } from '@/components/okinoworks';
import { GithubLink } from '@/components/github-link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth Toolkit',
  description: 'Authentication & Authorization for NextJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex w-full  absolute top-0 border-b  p-6 text-muted-foreground text-sm ">
            <span className="flex justify-between w-full">
              <div>
                <p className="font-bold font-mono"> AUTH TOOLKIT</p>
                <p className="tracking-tight text-xs">
                  {' '}
                  {' Authentication & Authorization Starter for NextJS'}
                </p>
              </div>
            </span>
          </div>
          <ModeToggle />
          <OkinoWorks />
          <GithubLink />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
