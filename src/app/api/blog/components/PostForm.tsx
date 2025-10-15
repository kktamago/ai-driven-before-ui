import React, { useState } from 'react';
import styles from '../style.module.css';

const PostForm = ({ onSubmit, initial }: { onSubmit: Function, initial?: any }) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');

  return (
    <form className={styles.postForm} onSubmit={e => { e.preventDefault(); onSubmit({ title, description }); }}>
      <input
        className={styles.input}
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="タイトル"
        required
      />
      <textarea
        className={styles.textarea}
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="本文"
        required
      />
      <button className={styles.button} type="submit">投稿</button>
    </form>
  );
};

export default PostForm;