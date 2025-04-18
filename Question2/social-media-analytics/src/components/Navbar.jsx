import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-graph-up me-2"></i>
          Social Media Analytics
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/') ? 'active fw-bold' : ''}`} 
                to="/"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-house-door me-1"></i> Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/top-users') ? 'active fw-bold' : ''}`} 
                to="/top-users"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-people me-1"></i> Top Users
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/trending') ? 'active fw-bold' : ''}`} 
                to="/trending"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-fire me-1"></i> Trending Posts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;