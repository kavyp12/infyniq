import React, { useState } from 'react';
import { Key, AlertTriangle, Copy, Check, Lock, RefreshCw } from 'lucide-react';

const ProfileSettings = () => {
  const [password, setPassword] = useState('');
  const [newKey, setNewKey] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState('');
  const [showNewKey, setShowNewKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const regenerateKey = async () => {
    if (!password) {
      setError('Password required for security verification');
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
        setNewKey(data.access_key);
        setShowNewKey(true);
        setPassword('');
      } else {
        setError(data.message || 'Failed to regenerate key');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setIsRegenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 product-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Access Key Management</h1>

      <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Key className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Database Access Key</h2>
            <p className="text-gray-600 text-sm">
              Your access key is required to create and manage databases. For security,
              we never display your full key after it's created.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-900 font-semibold mb-1">⚠️ Important</p>
              <p className="text-yellow-800 text-sm">
                Regenerating your access key will invalidate your old key immediately.
                You'll need to use the new key for all future database operations.
              </p>
            </div>
          </div>
        </div>

        {!showNewKey ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Your Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={regenerateKey}
              disabled={!password || isRegenerating}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-lg transition-all"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating New Key...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Regenerate Access Key
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <p className="text-green-800 font-semibold mb-2">✅ New Access Key Generated!</p>
              <p className="text-green-700 text-sm">
                Save this key now. It will not be shown again.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your New Access Key
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newKey}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded font-mono text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-sm mt-2">✓ Copied to clipboard!</p>
              )}
            </div>

            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              I've Saved My Key - Go to Dashboard
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Security Best Practices</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-indigo-600">✓</span>
            <span>Store your access key in a password manager (e.g., 1Password, Bitwarden)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600">✓</span>
            <span>Never share your access key with anyone</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600">✓</span>
            <span>Regenerate your key if you suspect it's been compromised</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600">✓</span>
            <span>Keep your access key separate from your login password</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSettings;

