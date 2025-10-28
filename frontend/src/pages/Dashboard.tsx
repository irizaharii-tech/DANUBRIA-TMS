import React, { useEffect, useState } from 'react';
import api from '../lib/api';
type Metrics = {
  cards: { activeOrders: number; revenue30d: number; vehiclesActive: number; avgMargin: number; };
  activity: { id: string; orderNumber: string; eventType: string; timestamp: string }[];
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get('/metrics').then(r => setMetrics(r.data));
    api.get('/orders').then(r => setOrders(r.data.slice(0,3)));
  }, []);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card stat">
          <div>
            <div className="text-sm text-gray-500">Active Orders</div>
            <div className="kpi">{metrics?.cards.activeOrders ?? '—'}</div>
          </div>
        </div>
        <div className="card stat">
          <div>
            <div className="text-sm text-gray-500">Revenue (30 days)</div>
            <div className="kpi">€{(metrics?.cards.revenue30d ?? 0).toLocaleString()}</div>
          </div>
        </div>
        <div className="card stat">
          <div>
            <div className="text-sm text-gray-500">Vehicles Active</div>
            <div className="kpi">{metrics?.cards.vehiclesActive ?? '—'}</div>
          </div>
        </div>
        <div className="card stat">
          <div>
            <div className="text-sm text-gray-500">Avg. Margin (DoD)</div>
            <div className="kpi">{metrics?.cards.avgMargin ?? '—'}%</div>
          </div>
        </div>
      </div>

      {/* Live tracking & chart placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Live Tracking</h3>
            <button className="text-blue-600 text-sm">View All</button>
          </div>
          <div className="h-40 bg-gray-100 rounded-xl grid place-items-center text-gray-400 text-sm">
            Map / markers placeholder
          </div>
          <ul className="mt-4 text-sm">
            {orders.map(o => (
              <li key={o.id} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                {o.orderNumber}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Revenue Last 30 Days</h3>
          </div>
          <div className="h-40 bg-gray-100 rounded-xl grid place-items-center text-gray-400 text-sm">
            Chart placeholder
          </div>
        </div>
      </div>

      {/* Quick Actions + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-2 rounded">+ Create New Order</button>
            <button className="w-full text-left bg-green-50 hover:bg-green-100 text-green-800 px-3 py-2 rounded">🚚 Assign Vehicle</button>
            <button className="w-full text-left bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-2 rounded">🧾 Generate Invoice</button>
            <button className="w-full text-left bg-purple-50 hover:bg-purple-100 text-purple-800 px-3 py-2 rounded">🗺️ View Dispatch Board</button>
          </div>
        </div>
        <div className="card p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Recent Orders</h3>
                <button className="text-blue-600 text-sm">View All</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="text-gray-500"><th className="text-left">Order ID</th><th className="text-left">Route</th><th className="text-left">Status</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-t">
                      <td className="py-2">{o.orderNumber}</td>
                      <td className="py-2">{o.origin} → {o.destination}</td>
                      <td className="py-2">
                        <span className={`badge ${o.status==='DELIVERED'?'badge-green':o.status==='IN_TRANSIT'?'badge-amber':'badge-blue'}`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Recent Activity</h3>
                <button className="text-blue-600 text-sm">View Full Log</button>
              </div>
              <ul className="space-y-2 text-sm">
                {(metrics?.activity ?? []).map(a => (
                  <li key={a.id} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block" />
                    <div>
                      <div className="text-gray-700">{a.eventType.replaceAll('_',' ')} for <b>{a.orderNumber}</b></div>
                      <div className="text-gray-400 text-xs">{new Date(a.timestamp).toLocaleString()}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
