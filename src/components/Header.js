import React from 'react';

function Header() {
  return (
    <header style={{
      width: '100%',
      background: '#273c75',
      color: '#fff',
      padding: '1rem 2rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      letterSpacing: '1px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      TMS Danubria - Transport Management Platform
    </header>
  );
}

export default Header;