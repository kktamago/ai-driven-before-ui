// 詳細ページ

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostDetail from '../components/PostDetail';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data.post);
        setLoading(false);
      })
      .catch(() => {
        setError('記事の取得に失敗しました');
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Header />
      {loading ? <Loader /> : error ? <ErrorMessage message={error} /> : post && <PostDetail post={post} />}
      <Footer />
    </>
  );
};

export default BlogDetailPage;