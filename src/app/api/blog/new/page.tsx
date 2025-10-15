// 新規投稿ページ

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostForm from '../components/PostForm';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { useRouter } from 'next/navigation';

const BlogNewPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (data: { title: string; description: string }) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      router.push('/blog');
    } catch {
      setError('投稿に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading ? <Loader /> : <PostForm onSubmit={handleSubmit} />}
      {error && <ErrorMessage message={error} />}
      <Footer />
    </>
  );
};

export default BlogNewPage;