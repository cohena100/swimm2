import {
  FETCH_USERS_LIMIT,
  FETCH_COMMENTS_LIMIT,
  FETCH_POSTS_LIMIT,
  FETCH_ALBUMS_LIMIT,
  FETCH_PHOTOS_LIMIT,
} from "../constants";
import { IUser } from "../types/user";

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: unknown }) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/users?_page=${pageParam}&_limit=${FETCH_USERS_LIMIT}`,
  );
  return response.json();
};

export const fetchUser = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}`);
  return response.json();
};
export const fetchUserPosts =
  (userId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}/posts?_page=${pageParam}&_limit=${FETCH_POSTS_LIMIT}`,
    );
    return response.json();
  };

export const fetchUserPostComments =
  (postId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments?_page=${pageParam}&_limit=${FETCH_COMMENTS_LIMIT}`,
    );
    return response.json();
  };

export const fetchUserAlbums =
  (userId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}/albums?_page=${pageParam}&_limit=${FETCH_ALBUMS_LIMIT}`,
    );
    return response.json();
  };

export const fetchUserAlbumPhotos =
  (albumId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/albums/${albumId}/photos?_page=${pageParam}&_limit=${FETCH_PHOTOS_LIMIT}`,
    );
    return response.json();
  };

export const updateUser = async (userId: string, body: Partial<IUser>) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/users/${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );
  return response.json();
};

export const createUser = async (body: Partial<IUser>) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
};
