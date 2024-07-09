import { FETCH_USERS_LIMIT } from "../constants";

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: unknown }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=${FETCH_USERS_LIMIT}`);
  return response.json();
};

export const fetchUserPosts =
  (userId: string) =>
  async ({ pageParam = 1 }: { pageParam: unknown }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts?_page=${pageParam}&_limit=${FETCH_USERS_LIMIT}`);
    return response.json();
  };
