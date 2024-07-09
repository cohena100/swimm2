import { IComment } from "../lib/types/comments";

type Props = { comment: IComment };

const Comment = ({ comment }: Props) => {
  return (
    <div className="card bg-primary text-primary-content w-96">
      <div className="card-body">
        <h2 className="card-title">{comment.body}</h2>
        <p>{comment.name}</p>
        <p>{comment.email}</p>
      </div>
    </div>
  );
};

export default Comment;
