import { initTRPC } from '@trpc/server';
import { requireAuth } from '@/lib/auth-utils';
import { cache } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { TRPCError } from '@trpc/server';


export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    throw new TRPCError({ 
      code: 'UNAUTHORIZED', 
      message: 'Unauthorized' 
    });
  }
  
  return next({ ctx: { session } });
});