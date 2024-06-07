import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Post, fetchPosts } from '../api/post';

export default function InfiniteScrollView1() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);

      const newPosts = await fetchPosts(20, page);

      setPosts((prev) => [...prev, ...newPosts]);
      setLoading(false);
    };

    loadPosts();
  }, [page]);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <ul>
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <li ref={lastPostElementRef} key={post.id}>
                {post.title}
              </li>
            );
          } else {
            return <li key={post.id}>{post.title}</li>;
          }
        })}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
}
