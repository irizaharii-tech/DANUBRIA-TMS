import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }: { setToken: (t: string) => void }) {
  const [email, setEmail] = useState('manager@example.com');
  const [password, setPassword] = useState('ManagerPassword123!');

  async function submit() {
    const res = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Danubria TMS</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full mb-4 p-2 border rounded" />
        <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </div>
    </div>
  );
}
