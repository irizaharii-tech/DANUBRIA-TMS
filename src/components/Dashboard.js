import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Placeholder for backend integration
    // fetch('/api/stats')
    //   .then(res => res.json())
    //   .then(data => setStats(data));
    setStats({
      orders: 120,
      vehicles: 15,
      drivers: 22,
      deliveriesToday: 8
    });
  }, []);

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div style={{
        display: 'flex',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '2rem',
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats?.orders}</div>
          <div>Orders</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '2rem',
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats?.vehicles}</div>
          <div>Vehicles</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '2rem',
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats?.drivers}</div>
          <div>Drivers</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '2rem',
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats?.deliveriesToday}</div>
          <div>Deliveries Today</div>
        </div>
      </div>
      <div>
        <h3>Quick Actions</h3>
        <ul>
          <li>Create New Order</li>
          <li>Add Vehicle</li>
          <li>Add Driver</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;