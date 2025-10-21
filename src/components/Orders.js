import React, { useEffect, useState } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Placeholder for backend/API logic
    // fetch('/api/orders')
    //   .then(res => res.json())
    //   .then(data => setOrders(data));
    setOrders([
      { id: 1, customer: "ACME Corp", status: "Pending", date: "2025-10-20" },
      { id: 2, customer: "Beta Ltd", status: "Completed", date: "2025-10-19" }
    ]);
  }, []);

  return (
    <div>
      <h2>Orders</h2>
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
            <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Customer</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td style={{ padding: '0.75rem' }}>{order.id}</td>
              <td style={{ padding: '0.75rem' }}>{order.customer}</td>
              <td style={{ padding: '0.75rem' }}>{order.status}</td>
              <td style={{ padding: '0.75rem' }}>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add Order CRUD forms and filters here */}
    </div>
  );
}

export default Orders;