import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      backgroundColor: '#ecf0f1',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: '#2c3e50',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Dashboard
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              User Information
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div>
                <p style={{
                  margin: '0 0 0.5rem 0',
                  color: '#7f8c8d',
                  fontSize: '14px'
                }}>
                  Name
                </p>
                <p style={{
                  margin: '0',
                  color: '#2c3e50',
                  fontSize: '18px',
                  fontWeight: '500'
                }}>
                  {user?.name}
                </p>
              </div>

              <div>
                <p style={{
                  margin: '0 0 0.5rem 0',
                  color: '#7f8c8d',
                  fontSize: '14px'
                }}>
                  Email
                </p>
                <p style={{
                  margin: '0',
                  color: '#2c3e50',
                  fontSize: '18px',
                  fontWeight: '500'
                }}>
                  {user?.email}
                </p>
              </div>

              <div>
                <p style={{
                  margin: '0 0 0.5rem 0',
                  color: '#7f8c8d',
                  fontSize: '14px'
                }}>
                  Member Since
                </p>
                <p style={{
                  margin: '0',
                  color: '#2c3e50',
                  fontSize: '18px',
                  fontWeight: '500'
                }}>
                  {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Account Status
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#27ae60',
                borderRadius: '50%'
              }}></div>
              <p style={{
                margin: '0',
                color: '#2c3e50',
                fontSize: '16px'
              }}>
                Active
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Security
            </h3>
            <p style={{
              margin: '0 0 1rem 0',
              color: '#7f8c8d',
              fontSize: '14px'
            }}>
              JWT Token Active
            </p>
            <div style={{
              backgroundColor: '#ecf0f1',
              padding: '0.75rem',
              borderRadius: '4px',
              fontSize: '12px',
              wordBreak: 'break-all',
              color: '#2c3e50'
            }}>
              {localStorage.getItem('token')?.substring(0, 50)}...
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#d5dbdb',
          borderRadius: '8px',
          borderLeft: '4px solid #3498db'
        }}>
          <h4 style={{ color: '#2c3e50', margin: '0 0 0.5rem 0' }}>
            ℹ️ Welcome to Dashboard
          </h4>
          <p style={{
            margin: '0',
            color: '#34495e',
            fontSize: '14px'
          }}>
            You're now logged in! This dashboard shows your profile information retrieved from the protected backend API. Your authentication token is securely stored in localStorage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
