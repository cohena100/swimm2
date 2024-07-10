import {
  FETCH_USERS_LIMIT,
  FETCH_COMMENTS_LIMIT,
  FETCH_POSTS_LIMIT,
  FETCH_ALBUMS_LIMIT,
  FETCH_PHOTOS_LIMIT,
} from "../constants";

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: unknown }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=${FETCH_USERS_LIMIT}`,
  );
  return response.json();
};

export const fetchUserPosts =
  (userId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts?_page=${pageParam}&_limit=${FETCH_POSTS_LIMIT}`,
    );
    return response.json();
  };

export const fetchUserPostComments =
  (postId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_page=${pageParam}&_limit=${FETCH_COMMENTS_LIMIT}`,
    );
    return response.json();
  };

export const fetchUserAlbums =
  (userId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums?_page=${pageParam}&_limit=${FETCH_ALBUMS_LIMIT}`,
    );
    return response.json();
  };

export const fetchUserAlbumPhotos =
  (albumId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_page=${pageParam}&_limit=${FETCH_PHOTOS_LIMIT}`,
    );
    return response.json();
  };
