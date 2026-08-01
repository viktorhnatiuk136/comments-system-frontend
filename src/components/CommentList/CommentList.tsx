import CommentItem from "../CommentItem/CommentItem";
import type { Comment } from "../../types/comment";

interface Props {
  comments: Comment[];
  onCommentCreated: () => void;
}

export default function CommentList({ comments, onCommentCreated }: Props) {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onCommentCreated={onCommentCreated}
        />
      ))}
    </>
  );
}
