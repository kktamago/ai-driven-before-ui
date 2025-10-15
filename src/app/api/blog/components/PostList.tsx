import React from 'react';
import PostItem from './PostItem';
import styles from '../style.module.css';

const PostList = ({ posts }: { posts: any[] }) => (
  <div className={styles.postList}>
    {posts.map(post => (
      <PostItem key={post.id} post={post} />
    ))}
  </div>
);

export default PostList;