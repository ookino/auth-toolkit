'use client';
import { Social } from './social';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '../ui/card';
import { Header } from './header';
import { BackButton } from './back-button';
import { AuthDivider } from './auth-divider';
import { cn } from '@/lib/utils';
import { poppins } from '../fonts';

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  subheaderLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  on2FA?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  subheaderLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  on2FA,
}: Props) {
  return (
    <Card className="w-[400px]">
      <CardHeader className="space-y-0">
        <CardTitle
          className={cn('text-3xl  tracking-tighter', poppins.className)}
        >
          {headerLabel}
        </CardTitle>
        <CardDescription>{subheaderLabel}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {children}

          {showSocial && !on2FA && (
            <>
              <AuthDivider />
              <Social />
            </>
          )}
        </div>
      </CardContent>

      {!on2FA && (
        <CardFooter className="items-start">
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      )}
    </Card>
  );
}
