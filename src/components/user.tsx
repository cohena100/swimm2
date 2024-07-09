import { IUser } from "../lib/types/user";

type Props = { user: IUser };

const User = ({ user }: Props) => {
  return <h1>{user.name}</h1>;
};

export default User;
