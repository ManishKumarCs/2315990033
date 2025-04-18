import React, { useState } from 'react';
import apiService from '../services/api';

function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (!showComments) {
      setLoading(true);
      try {
        const postComments = await apiService.getCommentsByPost(post.id);
        console.log(`Fetched ${postComments.length} comments for post ${post.id}:`, postComments);
        setComments(postComments);
      } catch (err) {
        console.error(`Error fetching comments for post ${post.id}:`, err);
      } finally {
        setLoading(false);
      }
    }
    setShowComments(!showComments);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">By {post.userName}</h6>
      </div>
      <div className="card-body">
        <p className="card-text">{post.body}</p>
        <button 
          className="btn btn-sm btn-outline-primary" 
          onClick={fetchComments}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>

      {loading && (
        <div className="card-footer text-center">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading comments...</span>
          </div>
        </div>
      )}

      {showComments && !loading && (
        <div className="card-footer">
          <h6>{comments.length} Comments</h6>
          {comments.length > 0 ? (
            <ul className="list-group list-group-flush">
              {comments.map(comment => (
                <li key={comment.id} className="list-group-item">
                  <strong>{comment.name}</strong>: {comment.body}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;