// src/components/ConnectionStep.tsx

import React, { useState } from 'react';
import { Database, Zap, Loader } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

const ConnectionStep: React.FC<Props> = ({ onSuccess }) => {
  const [creds, setCreds] = useState({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'adani_data', // Default database name
    port: '3306',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        onSuccess(); // This tells App.tsx to move to the next step
      } else {
        setError(data.message || 'Failed to connect. Please check credentials.');
      }
    } catch (err) {
      setError('Could not reach the backend server. Is it running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-xl">
        <div className="text-center mb-8">
          <Database className="mx-auto h-12 w-12 text-purple-400" />
          <h1 className="text-2xl font-bold mt-4">Connect to MySQL</h1>
          <p className="text-gray-400">Step 1: Provide database credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Host</label>
            <input name="host" value={creds.host} onChange={handleChange} className="input-style" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-medium text-gray-300">User</label>
                <input name="user" value={creds.user} onChange={handleChange} className="input-style" required />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-300">Port</label>
                <input name="port" value={creds.port} onChange={handleChange} className="input-style" required />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input type="password" name="password" value={creds.password} onChange={handleChange} className="input-style" />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-300">Database Name</label>
            <input name="database" value={creds.database} onChange={handleChange} className="input-style" required />
          </div>

          {error && <p className="text-red-400 text-sm text-center bg-red-900/50 p-2 rounded-md">{error}</p>}
          
          <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all">
            {isLoading ? <><Loader className="animate-spin h-5 w-5" /> Connecting...</> : <><Zap className="h-5 w-5" /> Connect</>}
          </button>
        </form>
      </div>
       <style>{`.input-style { box-sizing: border-box; width: 100%; background-color: #1F2937; border: 1px solid #4B5563; color: white; border-radius: 0.5rem; padding: 0.75rem; margin-top: 0.25rem; transition: border-color 0.2s; } .input-style:focus { outline: none; border-color: #8B5CF6; }`}</style>
    </div>
  );
};

export default ConnectionStep;