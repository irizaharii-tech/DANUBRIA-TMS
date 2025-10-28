import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(o => (
          <div key={o.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{o.orderNumber}</h2>
            <p>Status: {o.status}</p>
            <Link to={`/orders/${o.id}`} className="text-blue-600">Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
