import React from 'react';
import styles from '../style.module.css';

const PostItem = ({ post }: { post: any }) => (
  <div className={styles.postItem}>
    <a href={`/blog/${post.id}`} className={styles.postTitle}>{post.title}</a>
    <div className={styles.postMeta}>{post.date}</div>
    <div className={styles.postDesc}>{post.description}</div>
  </div>
);

export default PostItem;