import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Orders from './pages/Orders';

function Shell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4 flex flex-col">
        <div className="text-xl font-bold mb-6">Danubria TMS</div>
        <nav className="space-y-1 text-sm">
          <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-blue-800">Dashboard</Link>
          <Link to="/orders" className="block px-3 py-2 rounded hover:bg-blue-800">Orders</Link>
          <Link to="/customers" className="block px-3 py-2 rounded hover:bg-blue-800">Customers</Link>
          <Link to="/carriers" className="block px-3 py-2 rounded hover:bg-blue-800">Carriers</Link>
          <Link to="/fleet" className="block px-3 py-2 rounded hover:bg-blue-800">Fleet Management</Link>
          <Link to="/invoicing" className="block px-3 py-2 rounded hover:bg-blue-800">Invoicing</Link>
          <Link to="/analytics" className="block px-3 py-2 rounded hover:bg-blue-800">Analytics</Link>
          <Link to="/settings" className="block px-3 py-2 rounded hover:bg-blue-800">Settings</Link>
        </nav>
        <div className="mt-auto">
          <button
            onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
            className="w-full mt-6 bg-white/10 hover:bg-white/20 rounded px-3 py-2"
          >Logout</button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1">
        {/* Top bar */}
        <div className="h-14 border-b bg-white flex items-center justify-between px-4">
          <div className="text-gray-500 text-sm">Dashboard</div>
          <div className="flex items-center gap-3">
            <input placeholder="Search..." className="border rounded-lg px-3 py-1.5 text-sm" />
            <div className="w-8 h-8 rounded-full bg-blue-200"></div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Shell>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                {/* placeholders for others */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Shell>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
