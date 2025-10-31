import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, AlertTriangle, Copy, Check, Loader, ArrowLeft } from 'lucide-react';

const RegenerateKey = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [newAccessKey, setNewAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRegenerate = async () => {
    if (!password) {
      setError('Password is required for security verification');
      return;
    }

    setIsRegenerating(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/user/regenerate-access-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setNewAccessKey(data.access_key);
        setPassword(''); // Clear password for security
      } else {
        setError(data.message || 'Failed to regenerate key');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsRegenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newAccessKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full product-sans max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/database-setup')}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Database Setup
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <Key className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Regenerate Access Key</h1>
              <p className="text-indigo-100 text-sm">Create a new secure access key for database creation</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-900 font-semibold mb-1">⚠️ Important Security Notice</p>
                    <p className="text-yellow-800 text-sm">
                    Regenerating your access key will invalidate the old one. Make sure to save the new key securely.
                    You'll need it to create databases in the future.
                    </p>

              </div>
            </div>
          </div>

          {!newAccessKey ? (
            // Password Input Form
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Your Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="Enter your account password"
                  onKeyPress={(e) => e.key === 'Enter' && handleRegenerate()}
                />
                <p className="text-gray-500 text-sm mt-2">
                  For security, we need to verify your identity before regenerating the key
                </p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <button
                onClick={handleRegenerate}
                disabled={!password || isRegenerating}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:scale-100"
              >
                {isRegenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <Key className="w-5 h-5" />
                    Regenerate Access Key
                  </>
                )}
              </button>
            </>
          ) : (
            // New Key Display
            <>
              <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <p className="text-green-900 font-semibold">New Access Key Generated Successfully!</p>
                </div>
                <p className="text-green-800 text-sm">
                  ðŸ"' Save this key immediately. It will not be shown again!
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your New Access Key (64 characters)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newAccessKey}
                    readOnly
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-indigo-300 rounded-lg font-mono text-sm select-all"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {copied ? 'âœ… Copied to clipboard!' : 'Click the copy icon to copy'}
                </p>
              </div>

                <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                <p className="text-red-900 font-semibold mb-2">🚨 Critical: Save This Key Now!</p>
                <ul className="text-red-800 text-sm space-y-1 list-disc list-inside">
                    <li>Copy and save it in a secure password manager</li>
                    <li>This key cannot be recovered if lost</li>
                    <li>You'll need it every time you create a new database</li>
                </ul>
                </div>


              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Continue to Database Setup
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegenerateKey;