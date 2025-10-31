import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Key, Copy, Check, AlertTriangle } from 'lucide-react';

const SignupWithKey = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_email', data.email);
        
        // Show the access key ONCE
        setAccessKey(data.access_key);
        setShowKeyModal(true);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinue = () => {
    setShowKeyModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4 product-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Sign up to start using Infyniq AI</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                placeholder="At least 6 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-70"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/signin" className="text-indigo-600 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>

      {/* Access Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Key className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
              <p className="text-gray-600">Here's your database access key</p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-900 font-semibold mb-1">⚠️ Save This Key Now!</p>
                  <p className="text-yellow-800 text-sm">
                    This key will only be shown once. You need it to create databases.
                    Store it in a password manager or secure location.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Access Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={accessKey}
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
              onClick={handleContinue}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              I've Saved My Key - Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupWithKey;