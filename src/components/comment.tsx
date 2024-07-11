import { IComment } from "../lib/types/comment";

type Props = { comment: IComment };

const Comment = ({ comment }: Props) => {
  return (
    <div className="flex min-w-full flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {comment.body}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {comment.name}
        </p>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {comment.email}
        </p>
      </div>
    </div>
  );
};

export default Comment;
