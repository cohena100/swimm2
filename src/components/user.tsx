import { Link } from "@tanstack/react-router";
import { IUser } from "../lib/types/user";

type Props = { user: IUser };

const User = ({ user }: Props) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 min-w-96">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{user.name}</h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">{user.email}</p>
        <div className="flex gap-2">
          <Link
            to={`/users/${user.id}/posts`}
            className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Comments
          </Link>
          <Link
            to={`/users/${user.id}/albums`}
            className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Albums
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
