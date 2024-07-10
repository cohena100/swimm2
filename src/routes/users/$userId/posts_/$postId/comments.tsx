import { createFileRoute } from "@tanstack/react-router";
import { IComment } from "../../../../../lib/types/comments";
import { fetchUserPostComments } from "../../../../../lib/api/users";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import React from "react";
import Comment from "../../../../../components/comment";
import Spinner from "../../../../../components/spinner";

const commentsQueryOptions = (postId: string) =>
  infiniteQueryOptions<IComment[]>({
    queryKey: ["posts", postId],
    queryFn: fetchUserPostComments(postId),
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

export const Route = createFileRoute("/users/$userId/posts/$postId/comments")({
  loader: async ({ context, params: { postId } }) => {
    const { queryClient } = context;

    const data = queryClient.getQueryData(commentsQueryOptions(postId).queryKey) ?? (await queryClient.fetchInfiniteQuery(commentsQueryOptions(postId)));
    return {
      data,
    };
  },
  component: Comments,
});

function Comments() {
  const { postId } = Route.useParams();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(commentsQueryOptions(postId));
  const [isRefresh, refresh] = useState(0);
  useEffect(() => {
    if (inView) {
      fetchNextPage().then(() => refresh(isRefresh + 1));
    }
  }, [inView, fetchNextPage, isRefresh]);
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4">{data?.pages.map((group, i) => group.map((comment, j) => <Comment key={i * 1000 + j} comment={comment} />))}</div>
      <div ref={ref}>
        {(isFetchingNextPage || hasNextPage) && (
          <div className="flex justify-center mt-4">
            <Spinner />
          </div>
        )}
      </div>{" "}
    </div>
  );
}
