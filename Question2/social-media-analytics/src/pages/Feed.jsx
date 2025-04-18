import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import PostCard from '../components/PostCard';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const users = await apiService.getUsers();
        console.log('Fetched users:', users);
        
        let allPosts = [];
        
        for (const user of users) {
          const userPosts = await apiService.getPostsByUser(user.id);
          console.log(`Fetched posts for user ${user.id}:`, userPosts);
          
          allPosts = [
            ...allPosts, 
            ...userPosts.map(post => ({
              ...post, 
              userName: user.name
            }))
          ];
        }
        
        const sortedPosts = allPosts.sort((a, b) => b.id - a.id);
        
        setPosts(sortedPosts);
      } catch (err) {
        setError('Failed to load feed. Please try again later.');
        console.error('Error fetching feed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
    
    const pollingInterval = setInterval(() => {
      fetchFeed();
    }, 30000); 
    
    return () => clearInterval(pollingInterval);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Latest Posts</h2>
      
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
        <p className="text-center">No posts found.</p>
      )}
    </div>
  );
}

export default Feed;