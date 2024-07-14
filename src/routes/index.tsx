import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  // refetchOnWindowFocus: false,
  // staleTime: Infinity,
});
export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const { queryClient } = context;
    const data =
      queryClient.getQueryData(usersQueryOptions.queryKey) ??
      (await queryClient.fetchInfiniteQuery(usersQueryOptions));
    return {
      data,
    };
  },
  component: Index,
});

function Index() {
  const { ref, inView } = useInView();
  const [isRefresh, refresh] = useState(0);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(usersQueryOptions);
  useEffect(() => {
    if (inView) {
      fetchNextPage().then(() => refresh(isRefresh + 1));
    }
  }, [inView, fetchNextPage, isRefresh]);
  return (
    <div className="mt-4">
      <div className="fixed bottom-4 left-4">
        <Link
          to={`/users/add`}
          className="mt-2 inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
        >
          +
        </Link>
      </div>{" "}
      <div className="flex flex-wrap gap-4">
        {data?.pages.map((group, i) =>
          group.map((user, j) => <User key={i * 1000 + j} user={user} />),
        )}
      </div>
      <div ref={ref}>
        {(isFetchingNextPage || hasNextPage) && (
          <div className="mt-4 flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
