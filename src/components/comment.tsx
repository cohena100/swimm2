import { IComment } from "../lib/types/comments";

type Props = { comment: IComment };

const Comment = ({ comment }: Props) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 min-w-full">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{comment.body}</h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">{comment.name}</p>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">{comment.email}</p>
      </div>
    </div>
  );
};

export default Comment;
