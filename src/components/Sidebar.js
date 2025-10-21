import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/orders', label: 'Orders' },
  { path: '/vehicles', label: 'Vehicles' },
  { path: '/drivers', label: 'Drivers' },
  { path: '/reports', label: 'Reports' },
  { path: '/settings', label: 'Settings' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <nav style={{
      width: '220px',
      background: '#f8f9fa',
      borderRight: '1px solid #eee',
      padding: '2rem 0',
      minHeight: '100vh'
    }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {navItems.map(item => (
          <li key={item.path} style={{
            marginBottom: '1.2rem',
            background: location.pathname === item.path ? '#dff9fb' : 'none',
            borderRadius: '4px'
          }}>
            <Link to={item.path} style={{
              display: 'block',
              padding: '0.75rem 2rem',
              fontWeight: location.pathname === item.path ? 'bold' : 'normal'
            }}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;