// 一覧ページ

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const BlogPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => {
        setError('記事の取得に失敗しました');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {loading ? <Loader /> : error ? <ErrorMessage message={error} /> : <PostList posts={posts} />}
      <Footer />
    </>
  );
};

export default BlogPage;