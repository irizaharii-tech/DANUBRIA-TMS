import React, { useEffect, useState } from 'react';

function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Placeholder for backend/API logic
    // fetch('/api/drivers')
    //   .then(res => res.json())
    //   .then(data => setDrivers(data));
    setDrivers([
      { id: 1, name: "John Doe", status: "Available" },
      { id: 2, name: "Jane Smith", status: "On Delivery" }
    ]);
  }, []);

  return (
    <div>
      <h2>Drivers</h2>
      <table style={{
        width: '100%',
        background: '#fff',
        borderCollapse: 'collapse',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <thead style={{ background: '#f1f2f6' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td style={{ padding: '0.75rem' }}>{driver.id}</td>
              <td style={{ padding: '0.75rem' }}>{driver.name}</td>
              <td style={{ padding: '0.75rem' }}>{driver.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add Driver CRUD forms here */}
    </div>
  );
}

export default Drivers;