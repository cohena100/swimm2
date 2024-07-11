import { FETCH_COMMENTS_LIMIT } from "../constants";
import { IComment } from "../types/comment";

export const fetchComments = async ({
  pageParam = 1,
}: {
  pageParam: unknown;
}) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${pageParam}&_limit=${FETCH_COMMENTS_LIMIT}`,
  );
  return response.json();
};

export const fetchComment = async (id: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`,
  );
  return response.json();
};

export const updateComment = async (
  commentId: string,
  body: Omit<IComment, "id" | "postId">,
) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${commentId}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );
  return response.json();
};
