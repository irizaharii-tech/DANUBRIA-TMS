import React, { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => { api.get('/orders').then(r => setOrders(r.data)); }, []);

  const filtered = orders.filter(o =>
    [o.orderNumber, o.origin, o.destination, o.status].join(' ').toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Orders</h1>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search orders..." className="border rounded px-3 py-1.5" />
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-500">
              <th className="text-left p-3">Order</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Route</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{o.orderNumber}</td>
                <td className="p-3">{o.customerId ? 'Customer' : '-'}</td>
                <td className="p-3">{o.origin} → {o.destination}</td>
                <td className="p-3">
                  <span className={`badge ${o.status==='DELIVERED'?'badge-green':o.status==='IN_TRANSIT'?'badge-amber':'badge-blue'}`}>{o.status}</span>
                </td>
                <td className="p-3">€{(o.price ?? 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
