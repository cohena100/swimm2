import { FETCH_USERS_LIMIT } from "../constants";

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: unknown }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=${FETCH_USERS_LIMIT}`);
  return response.json();
};