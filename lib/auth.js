/**
 * This is a light wrapper around the getSession function
 * from next-auth/client
 */
import { getSession } from "next-auth/client";
import { useSession } from "next-auth/client";

//
export async function serverSideAuthorized(context) {
  // always authorize in development mode:
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // authorize if the user is an admin:

  const session = await getSession(context);
  return session && session.isAdmin;
}

export function useClientSideAuth() {
  if (process.env.NODE_ENV === "development") {
    return [true, false];
  }

  // authorize if the user is an admin:
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [session, loading] = useSession();
  return [session && session.isAdmin, loading];
}

// Example Usage:

/**
 * const [isAdmin, loading] = useClientSideAuth()
 *
 * if (isAdmin) {
 *    // do something that requires admin privilages
 * }
 */