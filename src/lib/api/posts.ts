import { FETCH_POSTS_LIMIT } from "../constants";

export const fetchPosts = async ({ pageParam = 1 }: { pageParam: unknown }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${FETCH_POSTS_LIMIT}`);
  return response.json();
};
