import { useEffect, useRef, useState } from 'react';
import { Post, fetchPosts } from '../api/post';

export default function InfiniteScrollView2() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFetchAll, setIsFetchAll] = useState(false);
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver);

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);

      const newPosts = await fetchPosts(20, page);

      if (newPosts.length) {
        setPosts((prev) => [...prev, ...newPosts]);
      } else {
        setIsFetchAll(true);
      }

      setLoading(false);
    };

    loadPosts();
  }, [page]);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <ul>
        {posts.map((post, index) => {
          return <li key={`post-${index}`}>{post.title}</li>;
        })}
      </ul>
      {!isFetchAll && (
        <div
          ref={lastElementRef}
          style={{ height: 50, background: 'red' }}
        ></div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}
