import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { User } from "../types";

export const Route = createFileRoute("/")({
  component: Index,
});

const FETCH_USERS_LIMIT = 3;

function Index() {
  const fetchUsers = async ({ pageParam = 1 }: { pageParam: unknown }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=${FETCH_USERS_LIMIT}`);
    return response.json();
  };
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
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
              <p key={user.id} className="min-h-64">
                {user.name}
              </p>
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && hasNextPage ? <p className="text-center">Loading...</p> : <p className="text-center">No more posts found</p>}
      <div ref={ref}></div>
    </div>
  );
}
