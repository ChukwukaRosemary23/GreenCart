// client/src/hooks/useInfiniteScroll.js
import { useState, useCallback } from 'react';

const useInfiniteScroll = (fetchMore) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const hasMoreData = await fetchMore();
      setHasMore(hasMoreData);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchMore, loading, hasMore]);

  return { loading, hasMore, loadMore };
};

export default useInfiniteScroll;