import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './Admin.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await apiClient.get('/admin/stats', user.token);
        setStats(data);
      } catch (error) {
        showToast(error.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate, showToast]);

  if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="primary-button" onClick={() => navigate('/admin/products')}>
          Manage Products
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats?.totalOrders || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats?.totalProducts || 0}</p>
        </div>
        <div className="stat-card highlight-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">Rs. {(stats?.totalRevenue || 0).toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
