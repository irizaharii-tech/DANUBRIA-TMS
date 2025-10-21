import React, { useEffect, useState } from 'react';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Placeholder for backend/API logic
    // fetch('/api/vehicles')
    //   .then(res => res.json())
    //   .then(data => setVehicles(data));
    setVehicles([
      { id: 1, plate: "B-1234-DNB", type: "Truck", status: "Active" },
      { id: 2, plate: "B-5678-DNB", type: "Van", status: "Maintenance" }
    ]);
  }, []);

  return (
    <div>
      <h2>Vehicles</h2>
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
            <th style={{ padding: '1rem', textAlign: 'left' }}>License Plate</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td style={{ padding: '0.75rem' }}>{vehicle.id}</td>
              <td style={{ padding: '0.75rem' }}>{vehicle.plate}</td>
              <td style={{ padding: '0.75rem' }}>{vehicle.type}</td>
              <td style={{ padding: '0.75rem' }}>{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add Vehicle CRUD forms here */}
    </div>
  );
}

export default Vehicles;