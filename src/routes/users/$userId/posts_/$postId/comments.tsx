import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId/posts/$postId/comments")({
  component: () => <div>Hello /users/$userId/posts/$postId/comments!</div>,
});
