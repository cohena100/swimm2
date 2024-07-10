import { Link } from "@tanstack/react-router";
import { IPost } from "../lib/types/post";

type Props = { post: IPost };

const Post = ({ post }: Props) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 min-w-full">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{post.title}</h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">{post.body}</p>
        <Link
          to={`/users/${post.userId}/posts/${post.id}/comments`}
          className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Comments
        </Link>
      </div>
    </div>
  );
};

export default Post;
