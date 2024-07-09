import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IPost } from "../lib/types/post";
import { fetchUserPosts } from "../lib/api/users";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import React from "react";
import Post from "../components/post";

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

    const data = queryClient.getQueryData(postsQueryOptions(userId).queryKey) ?? (await queryClient.fetchInfiniteQuery(postsQueryOptions(userId)));
    return {
      data,
    };
  },
  component: Posts,
});

function Posts() {
  const { userId } = Route.useParams();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(postsQueryOptions(userId));
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
            {group.map((post) => (
              <Post post={post} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && hasNextPage ? <p className="text-center">Loading...</p> : <p className="text-center">No more posts found</p>}
      <div ref={ref}></div>
    </div>
  );
}
