import { IUser } from "../lib/types/user";

type Props = { user: IUser };

const User = ({ user }: Props) => {
  return (
    <div className="card bg-primary text-primary-content w-96">
      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <p>{user.email}</p>
        <div className="card-actions justify-end">
          <button className="btn">Posts</button>
        </div>
      </div>
    </div>
  );
};

export default User;
