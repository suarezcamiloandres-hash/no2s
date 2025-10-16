import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.user.findMany({
      where: {  
        id: ctx.session.user.id,
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;