import { getQueryClient, trpc } from '@/trpc/server';
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';


const Page = async () => {
  const queryClient = getQueryClient(); 
 
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
    );
};

export default Page;