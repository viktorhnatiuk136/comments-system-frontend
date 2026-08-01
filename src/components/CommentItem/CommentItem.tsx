import { useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import type { Comment } from "../../types/comment";

import styles from "./CommentItem.module.css";

interface Props {
  comment: Comment;
  onCommentCreated: () => void;
}

export default function CommentItem({ comment, onCommentCreated }: Props) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div
      className={`${styles.comment} ${
        comment.parentId ? styles.replyComment : ""
      }`}
    >
      <h4 className={styles.userName}>{comment.userName}</h4>

      <div
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: comment.text,
        }}
      />

      <small className={styles.date}>
        {new Date(comment.createdAt).toLocaleString()}
      </small>

      <br />

      <button
        className={styles.replyButton}
        onClick={() => setIsReplying(!isReplying)}
      >
        Reply
      </button>

      {isReplying && (
        <CommentForm
          parentId={comment.id}
          onCommentCreated={() => {
            onCommentCreated();
            setIsReplying(false);
          }}
        />
      )}

      {comment.replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onCommentCreated={onCommentCreated}
        />
      ))}
    </div>
  );
}
