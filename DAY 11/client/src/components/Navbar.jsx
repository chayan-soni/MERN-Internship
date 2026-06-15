import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={{
        color: 'white',
        textDecoration: 'none',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        JWT Auth
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <span style={{ color: 'white' }}>
              Welcome, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'white',
              textDecoration: 'none'
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              color: 'white',
              textDecoration: 'none'
            }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
