// DatabaseDetails.tsx - Replace with this code
// REFACTORED: Light mode theme

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Database, Upload, MessageSquare, Plus, Table, Trash2, AlertTriangle, Loader } from 'lucide-react';

interface TableInfo {
  name: string;
  rows: number;
}

interface AnalysisProgress {
  total_tables: number;
  analyzed_tables: number;
  progress_percentage: number;
  is_complete: boolean;
}

const DatabaseDetails = () => {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tableToDelete, setTableToDelete] = useState<string | null>(null);
  const [isDeletingTable, setIsDeletingTable] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const databaseName = location.state?.databaseName || localStorage.getItem('selected_database');

  useEffect(() => {
    loadTables();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isAnalyzing && databaseName) {
      intervalId = setInterval(() => {
        checkAnalysisProgress();
      }, 2000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAnalyzing, databaseName]);

  const checkAnalysisProgress = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analysis-progress/${databaseName}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setAnalysisProgress(data);
        
        if (data.is_complete) {
          setIsAnalyzing(false);
          setUploadMessage('✅ Analysis complete! Your data is ready to query.');
          setTimeout(() => setUploadMessage(''), 3000);
        }
      }
    } catch (error) {
      console.error('Failed to check analysis progress:', error);
    }
  };

  const loadTables = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/database-tables', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setTables(data.tables);
      }
    } catch (error) {
      console.error('Failed to load tables:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUploadMore = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadMessage(`📤 Uploading ${selectedFiles.length} file(s)...`);
    
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => formData.append('files', file));

      const uploadResponse = await fetch('http://localhost:5000/api/upload-user-csv', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success) throw new Error(uploadData.error);

      setUploadMessage(`⚙️ Processing ${uploadData.files.length} CSV file(s) to database...`);

      const processResponse = await fetch('http://localhost:5000/api/process-user-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const processData = await processResponse.json();
      if (!processData.success) throw new Error(processData.error);

      setUploadMessage(`✅ Successfully uploaded ${processData.files_processed} file(s), created ${processData.details.successful} table(s). 🧠 AI is analyzing...`);
      
      setIsAnalyzing(true);
      setAnalysisProgress({
        total_tables: processData.tables_analyzed || 0,
        analyzed_tables: 0,
        progress_percentage: 0,
        is_complete: false
      });

      await loadTables();
      setSelectedFiles([]);
      
    } catch (error) {
      setUploadMessage('❌ ' + (error instanceof Error ? error.message : 'Upload failed'));
      setTimeout(() => setUploadMessage(''), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteTable = async (tableName: string) => {
    setIsDeletingTable(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/delete-table/${tableName}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        setUploadMessage(`✅ Table "${tableName}" deleted successfully`);
        await loadTables();
        setTimeout(() => setUploadMessage(''), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setUploadMessage('❌ ' + (error instanceof Error ? error.message : 'Delete failed'));
      setTimeout(() => setUploadMessage(''), 5000);
    } finally {
      setIsDeletingTable(false);
      setTableToDelete(null);
    }
  };

  return (
    <div className="product-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{databaseName}</h1>
          <p className="text-gray-600">{tables.length} tables</p>
        </div>
        
        <button
          onClick={() => navigate('/ai-assistant')}
          className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <MessageSquare className="w-5 h-5" />
          Query with AI
        </button>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && analysisProgress && (
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            <div>
              <h3 className="text-lg font-bold text-blue-800">
                🧠 AI Analyzing Database Structure
              </h3>
              <p className="text-blue-700 text-sm">
                Building semantic understanding of your data for intelligent queries
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-700">
              <span>Analyzing: {analysisProgress.analyzed_tables} / {analysisProgress.total_tables} tables</span>
              <span className="font-bold">{analysisProgress.progress_percentage}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${analysisProgress.progress_percentage}%` }}
              />
            </div>
            <p className="text-xs text-blue-600 mt-2">
              {analysisProgress.progress_percentage < 30 
                ? '📊 Reading table structures...' 
                : analysisProgress.progress_percentage < 70 
                ? '🔍 Analyzing data patterns...' 
                : '✨ Finalizing semantic profiles...'}
            </p>
          </div>
        </div>
      )}

      {/* Upload Message */}
      {uploadMessage && (
        <div className={`rounded-xl p-4 mb-8 border ${
          uploadMessage.includes('✅') 
            ? 'bg-green-100 border-green-300' 
            : uploadMessage.includes('❌')
            ? 'bg-red-100 border-red-300'
            : 'bg-blue-100 border-blue-300'
        }`}>
          <p className={
            uploadMessage.includes('✅') 
              ? 'text-green-800' 
              : uploadMessage.includes('❌')
              ? 'text-red-800'
              : 'text-blue-800'
          }>
            {uploadMessage}
          </p>
        </div>
      )}

      {/* Upload More Section */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add More CSV Files
        </h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-all mb-4">
          <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <input
            type="file"
            multiple
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            id="csv-upload-more"
          />
          <label htmlFor="csv-upload-more" className="cursor-pointer">
            <span className="text-indigo-600 hover:text-indigo-500 font-semibold">
              Choose CSV files
            </span>
          </label>
          <p className="text-gray-500 text-sm mt-2">Upload multiple files at once</p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-gray-900 font-semibold mb-2">{selectedFiles.length} files selected</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, i) => (
                <div key={i} className="text-sm text-gray-700">• {file.name}</div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleUploadMore}
          disabled={selectedFiles.length === 0 || isUploading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
        >
          {isUploading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload & Analyze
            </>
          )}
        </button>
      </div>

      {/* Tables List */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Table className="w-5 h-5" />
          Tables in Database
        </h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <Loader className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          </div>
        ) : tables.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tables yet. Upload CSV files to create tables.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <div key={table.name} className="bg-white rounded-lg p-4 border border-gray-300 group hover:border-indigo-500 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <Table className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <h3 className="font-semibold text-gray-900 truncate" title={table.name}>{table.name}</h3>
                  </div>
                  <button
                    onClick={() => setTableToDelete(table.name)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Delete table"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm">{table.rows.toLocaleString()} rows</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {tableToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-300 shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold text-gray-900">Delete Table</h3>
            </div>
            
            <p className="text-gray-600 mb-2">
              Are you sure you want to delete the table:
            </p>
            <p className="text-gray-900 font-semibold mb-4 bg-gray-100 p-3 rounded break-all">
              {tableToDelete}
            </p>
            <p className="text-red-600 text-sm mb-6">
              ⚠️ This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setTableToDelete(null)}
                disabled={isDeletingTable}
                className="flex-1 py-3 bg-white border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 text-gray-800 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTable(tableToDelete)}
                disabled={isDeletingTable}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isDeletingTable ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete
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

export default DatabaseDetails;