import { Link } from "@tanstack/react-router";
import { IUser } from "../lib/types/user";

type Props = { user: IUser };

const User = ({ user }: Props) => {
  return (
    <div className="flex min-w-96 flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-700/70">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {user.name}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">{user.email}</p>
        <div className="flex gap-2">
          <Link
            to={`/users/${user.id}/posts`}
            className="mt-2 inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
          >
            Posts
          </Link>
          <Link
            to={`/users/${user.id}/albums`}
            className="mt-2 inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
          >
            Albums
          </Link>
          <Link
            to={`/users/${user.id}/edit`}
            className="mt-2 inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
