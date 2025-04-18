import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { calculateTopUsers } from '../utils/helper';
import UserCard from '../components/UserCard';

function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const topUsers = await calculateTopUsers(apiService);
        setUsers(topUsers);
      } catch (err) {
        setError('Failed to load top users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Top Users</h2>
      
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
      ) : users.length > 0 ? (
        <div className="row">
          {users.map(user => (
            <div key={user.id} className="col-md-6 col-lg-4 mb-3">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No users found.</p>
      )}
    </div>
  );
}

export default TopUsers;
