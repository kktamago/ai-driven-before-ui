import React from 'react';
import styles from '../style.module.css';

const PostDetail = ({ post }: { post: any }) => (
  <div className={styles.postDetail}>
    <h2 className={styles.postTitle}>{post.title}</h2>
    <div className={styles.postMeta}>{post.date}</div>
    <div className={styles.postDesc}>{post.description}</div>
  </div>
);

export default PostDetail;