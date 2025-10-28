import React, { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('manager@example.com');
  const [password, setPassword] = useState('ManagerPassword123!');
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function submit() {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch (e) {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100">
      <div className="card w-[380px] p-6">
        <h1 className="text-xl font-semibold mb-4 text-center">Danubria TMS</h1>
        <input className="w-full border rounded px-3 py-2 mb-2" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2 mb-2" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button onClick={submit} className="w-full bg-blue-600 text-white rounded px-3 py-2">Login</button>
      </div>
    </div>
  );
}
