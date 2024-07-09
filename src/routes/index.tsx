import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IUser } from "../lib/types/user";
import User from "../components/user";
import { fetchUsers } from "../lib/api/users";

const usersQueryOptions = infiniteQueryOptions<IUser[]>({
  queryKey: ["users"],
  queryFn: fetchUsers,
  initialPageParam: 1,
  getNextPageParam(lastPage, allPages) {
    return lastPage.length > 0 ? allPages.length + 1 : undefined;
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
});
export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    const data = queryClient.getQueryData(usersQueryOptions.queryKey) ?? (await queryClient.fetchInfiniteQuery(usersQueryOptions));
    return {
      data,
    };
  },
  component: Index,
});

function Index() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(usersQueryOptions);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((user) => (
              <User user={user} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && hasNextPage ? <p className="text-center">Loading...</p> : <p className="text-center">No more users found</p>}
      <div ref={ref}></div>
    </div>
  );
}
