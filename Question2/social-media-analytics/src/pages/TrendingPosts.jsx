import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { calculateTrendingPosts } from '../utils/helper';
import PostCard from '../components/PostCard';

function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const trendingPosts = await calculateTrendingPosts(apiService);
        setPosts(trendingPosts);
      } catch (err) {
        setError('Failed to load trending posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Trending Posts</h2>
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center">No trending posts found.</p>
      )}
    </div>
  );
}

export default TrendingPosts;