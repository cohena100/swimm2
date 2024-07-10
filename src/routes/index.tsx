import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { IUser } from "../lib/types/user";
import User from "../components/user";
import { fetchUsers } from "../lib/api/users";
import Spinner from "../components/spinner";

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
  const [isRefresh, refresh] = useState(0);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(usersQueryOptions);
  useEffect(() => {
    if (inView) {
      fetchNextPage().then(() => refresh(isRefresh + 1));
    }
  }, [inView, fetchNextPage, isRefresh]);
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4">{data?.pages.map((group, i) => group.map((user, j) => <User key={i * 1000 + j} user={user} />))}</div>
      <div ref={ref}>
        {(isFetchingNextPage || hasNextPage) && (
          <div className="flex justify-center mt-4">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
