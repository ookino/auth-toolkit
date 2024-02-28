/**
 * Represents a page where user data is retrieved from the session on the client side.
 * @module ClientPage
 * @returns {JSX.Element} The JSX code for the ClientPage component.
 */

'use client';

import { UserData } from '@/components/user-data';
import { useCurrentUser } from '@/hooks/use-current-user';

/**
 * ClientPage component renders a page where user data is fetched from the session on the client side.
 * @returns {JSX.Element} The JSX code for the ClientPage component.
 */
export default function ClientPage() {
  // Fetches the current user data
  const user = useCurrentUser();

  return (
    <div>
      {/* Renders the UserData component with user data */}
      <UserData
        label="Client Example"
        user={user}
        description="Retrieving user data from session on a Client component"
      />
    </div>
  );
}
