import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IUser } from "../types";
import User from "../components/user";

const fetchUsers = async ({ pageParam = 1 }: { pageParam: unknown }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=${FETCH_USERS_LIMIT}`);
  return response.json();
};
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

const FETCH_USERS_LIMIT = 3;

function Index() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(usersQueryOptions);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <div>
      <h1 className="text-2xl">Personalised Post for you</h1>
      <div>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((user) => (
              <User user={user} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && hasNextPage ? <p className="text-center">Loading...</p> : <p className="text-center">No more posts found</p>}
      <div ref={ref}></div>
    </div>
  );
}
