import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IPost } from "../../../lib/types/post";
import { fetchUserPosts } from "../../../lib/api/users";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Post from "../../../components/post";
import Spinner from "../../../components/spinner";

const postsQueryOptions = (userId: string) =>
  infiniteQueryOptions<IPost[]>({
    queryKey: ["user", "posts", userId],
    queryFn: fetchUserPosts(userId),
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

export const Route = createFileRoute("/users/$userId/posts")({
  loader: async ({ context, params: { userId } }) => {
    const { queryClient } = context;

    const data =
      queryClient.getQueryData(postsQueryOptions(userId).queryKey) ??
      (await queryClient.fetchInfiniteQuery(postsQueryOptions(userId)));
    return {
      data,
    };
  },
  component: Posts,
});

function Posts() {
  const { userId } = Route.useParams();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(postsQueryOptions(userId));
  const [isRefresh, refresh] = useState(0);
  useEffect(() => {
    if (inView) {
      fetchNextPage().then(() => refresh(isRefresh + 1));
    }
  }, [inView, fetchNextPage, isRefresh]);
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4">
        {data?.pages.map((group, i) =>
          group.map((post, j) => <Post key={i * 1000 + j} post={post} />),
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
