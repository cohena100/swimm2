import { IPost } from "../lib/types/post";

type Props = { post: IPost };

const Post = ({ post }: Props) => {
  return (
    <div className="card bg-primary text-primary-content w-96">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.body}</p>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default Post;
