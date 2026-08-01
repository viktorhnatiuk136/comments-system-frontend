import { useState } from "react";
import { createComment } from "../../api/comments";
import Captcha from "../Captcha/Captcha";

import styles from "./CommentForm.module.css";

interface Props {
  onCommentCreated: () => void;
  parentId?: number;
}

export default function CommentForm({ onCommentCreated, parentId }: Props) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [homePage, setHomePage] = useState("");
  const [text, setText] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [captchaText, setCaptchaText] = useState("");

  const insertTag = (openTag: string, closeTag: string) => {
    setText((prev) => prev + openTag + closeTag);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createComment({
        userName,
        email,
        homePage: homePage || undefined,
        text,
        captchaId,
        captchaText,
        parentId,
      });

      onCommentCreated();

      alert("Коментар створено");

      setUserName("");
      setEmail("");
      setHomePage("");
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className={styles.input}
        type="url"
        placeholder="Home Page"
        value={homePage}
        onChange={(e) => setHomePage(e.target.value)}
      />

      <div className={styles.toolbar}>
        <button
          className={styles.toolbarButton}
          type="button"
          onClick={() => insertTag("<i>", "</i>")}
        >
          [i]
        </button>

        <button
          className={styles.toolbarButton}
          type="button"
          onClick={() => insertTag("<strong>", "</strong>")}
        >
          [strong]
        </button>

        <button
          className={styles.toolbarButton}
          type="button"
          onClick={() => insertTag("<code>", "</code>")}
        >
          [code]
        </button>

        <button
          className={styles.toolbarButton}
          type="button"
          onClick={() => insertTag('<a href="" title="">', "</a>")}
        >
          [a]
        </button>
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Comment text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <h3 className={styles.previewTitle}>Preview</h3>

      <div
        className={styles.preview}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />

      <Captcha
        onChange={(id, text) => {
          setCaptchaId(id);
          setCaptchaText(text);
        }}
      />

      <button className={styles.submitButton} type="submit">
        Додати коментар
      </button>
    </form>
  );
}
