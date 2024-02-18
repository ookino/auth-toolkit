import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface Props {
  message?: string;
  status: 'error' | 'success';
}
export function FormAlert({ message, status }: Props) {
  return (
    <div
      className={cn(
        'w-full p-3 rounded-md flex items-center gap-x-2 text-sm ',
        status === 'error'
          ? 'bg-destructive/15 text-destructive'
          : 'bg-green-500/15 text-green-500'
      )}
    >
      {status === 'error' && <ExclamationTriangleIcon className="h-4 w-4" />}
      {status === 'success' && <CheckCircledIcon className="h-4 w-4" />}
      <p>{message}</p>
    </div>
  );
}
