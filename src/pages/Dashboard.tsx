// Dashboard.tsx - Replace with this code
// REFACTORED: Light mode theme

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Plus, Eye, Trash2, AlertTriangle, Loader } from 'lucide-react';

interface UserDatabase {
  name: string;
  table_count: number;
  created_at: string;
}

const Dashboard = () => {
  const [databases, setDatabases] = useState<UserDatabase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [dbToDelete, setDbToDelete] = useState<string | null>(null);
  const [isDeletingDb, setIsDeletingDb] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (!email) {
      navigate('/signin');
      return;
    }
    setUserName(email);
    loadDatabases();
  }, [navigate]);

  const loadDatabases = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/databases', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setDatabases(data.databases);
      }
    } catch (error) {
      console.error('Failed to load databases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDatabase = () => {
    navigate('/setup');
  };

  const handleSelectDatabase = async (dbName: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/switch-user-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ database_name: dbName }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('selected_database', dbName);
        navigate('/database-details', { state: { databaseName: dbName } });
      } else {
        alert(data.error || 'Failed to switch database');
      }
    } catch (error) {
      console.error('Failed to switch database:', error);
      alert('Failed to switch database');
    }
  };

  const handleDeleteDatabase = async (dbName: string) => {
    setIsDeletingDb(true);

    try {
      const response = await fetch(`http://localhost:5000/api/delete-database/${dbName}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setDeleteMessage(`✅ Database "${dbName}" deleted successfully`);
        await loadDatabases();
        setTimeout(() => setDeleteMessage(''), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setDeleteMessage('❌ ' + (error instanceof Error ? error.message : 'Delete failed'));
      setTimeout(() => setDeleteMessage(''), 5000);
    } finally {
      setIsDeletingDb(false);
      setDbToDelete(null);
    }
  };

  return (
    <div className="product-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Your Databases</h1>
            <p className="text-lg text-gray-600">Welcome back, {userName}</p>
          </div>
        </div>
      </div>

      {/* Delete Message */}
      {deleteMessage && (
        <div className="mb-6">
          <div
            className={`rounded-xl p-4 border ${
              deleteMessage.includes('✅')
                ? 'bg-green-100 border-green-300'
                : 'bg-red-100 border-red-300'
            }`}
          >
            <p
              className={
                deleteMessage.includes('✅') ? 'text-green-800' : 'text-red-800'
              }
            >
              {deleteMessage}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mb-8">
        <button
          onClick={handleCreateDatabase}
          className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Create New Database
        </button>
      </div>

      {/* Databases Grid */}
      <div>
        {isLoading ? (
          <div className="text-center text-gray-500 py-12">
            <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
            Loading your databases...
          </div>
        ) : databases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-300 p-12 text-center shadow-lg">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Databases Yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first database to start analyzing data with AI
            </p>
            <button
              onClick={handleCreateDatabase}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Create Database
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databases.map((db) => (
              <div
                key={db.name}
                className="bg-white rounded-xl border border-gray-300 p-6 shadow-lg hover:shadow-xl hover:border-indigo-500 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center border border-indigo-200">
                    <Database className="w-6 h-6 text-indigo-600" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDbToDelete(db.name);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Delete database"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{db.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{db.table_count} tables</p>

                <button
                  onClick={() => handleSelectDatabase(db.name)}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  Open
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Database Confirmation Modal */}
      {dbToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-300 shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold text-gray-900">Delete Database</h3>
            </div>

            <p className="text-gray-600 mb-2">
              Are you sure you want to delete the database:
            </p>
            <p className="text-gray-900 font-semibold mb-4 bg-gray-100 p-3 rounded">
              {dbToDelete}
            </p>
            <p className="text-red-600 text-sm mb-6">
              ⚠️ This will permanently delete all tables and data. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDbToDelete(null)}
                disabled={isDeletingDb}
                className="flex-1 py-3 bg-white border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 text-gray-800 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteDatabase(dbToDelete)}
                disabled={isDeletingDb}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isDeletingDb ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;