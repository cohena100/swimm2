import { createFileRoute } from "@tanstack/react-router";
import { fetchUserAlbumPhotos } from "../../../../../lib/api/users";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Spinner from "../../../../../components/spinner";
import { IPhoto } from "../../../../../lib/types/photo";
import Photo from "../../../../../components/photo";

const photosQueryOptions = (albumId: string) =>
  infiniteQueryOptions<IPhoto[]>({
    queryKey: [albumId, "posts"],
    queryFn: fetchUserAlbumPhotos(albumId),
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

export const Route = createFileRoute("/users/$userId/albums/$albumId/photos")({
  loader: async ({ context, params: { albumId } }) => {
    const { queryClient } = context;

    const data = queryClient.getQueryData(photosQueryOptions(albumId).queryKey) ?? (await queryClient.fetchInfiniteQuery(photosQueryOptions(albumId)));
    return {
      data,
    };
  },
  component: Photos,
});

function Photos() {
  const { albumId } = Route.useParams();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(photosQueryOptions(albumId));
  const [isRefresh, refresh] = useState(0);
  useEffect(() => {
    if (inView) {
      fetchNextPage().then(() => refresh(isRefresh + 1));
    }
  }, [inView, fetchNextPage, isRefresh]);
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4">{data?.pages.map((group, i) => group.map((photo, j) => <Photo key={i * 1000 + j} photo={photo} />))}</div>
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
