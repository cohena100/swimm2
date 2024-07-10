import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IAlbum } from "../../../lib/types/album";
import { fetchUserAlbums } from "../../../lib/api/users";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner";
import Album from "../../../components/album";

const albumsQueryOptions = (userId: string) =>
  infiniteQueryOptions<IAlbum[]>({
    queryKey: ["user", userId, "albums"],
    queryFn: fetchUserAlbums(userId),
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
export const Route = createFileRoute("/users/$userId/albums")({
  loader: async ({ context, params: { userId } }) => {
    const { queryClient } = context;

    const data = queryClient.getQueryData(albumsQueryOptions(userId).queryKey) ?? (await queryClient.fetchInfiniteQuery(albumsQueryOptions(userId)));
    return {
      data,
    };
  },
  component: Albums,
});

function Albums() {
  const { userId } = Route.useParams();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(albumsQueryOptions(userId));
  const [isRefresh, refresh] = useState(0);
  useEffect(() => {
    if (inView) {
      fetchNextPage().then(() => refresh(isRefresh + 1));
    }
  }, [inView, fetchNextPage, isRefresh]);
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4">{data?.pages.map((group, i) => group.map((album, j) => <Album key={i * 1000 + j} album={album} />))}</div>
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
