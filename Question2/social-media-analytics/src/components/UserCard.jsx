import React from 'react';

function UserCard({ user }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{user.name}</h5>
          <span className="badge bg-primary">{user.postCount} posts</span>
        </div>
        <p className="card-text">User ID: {user.id}</p>
      </div>
    </div>
  );
}

export default UserCard;