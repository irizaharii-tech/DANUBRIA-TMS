import React, { useState } from 'react';
import axios from 'axios';

export default function PublicUpdate() {
  const [token, setToken] = useState('');
  const [resp, setResp] = useState<any>(null);

  async function submit() {
    const res = await axios.post('/api/public/update', { token });
    setResp(res.data);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">Public Update (signed token)</h2>
      <textarea value={token} onChange={(e)=>setToken(e.target.value)} className="w-full h-32 border p-2" />
      <button onClick={submit} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      <pre className="mt-4">{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
}
