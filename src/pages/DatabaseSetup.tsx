import React, { useState } from 'react';
import { Database, Upload, CheckCircle, XCircle, Loader, FileText, Server } from 'lucide-react';

interface ConnectionConfig {
  host: string;
  user: string;
  password: string;
  port: string;
  database: string;
}

const DatabaseSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ConnectionConfig>({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'adani_data'
  });
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [databases, setDatabases] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [dropExisting, setDropExisting] = useState(true);

  const testConnection = async () => {
    setConnectionStatus('testing');
    
    try {
      const response = await fetch('http://localhost:5000/api/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setConnectionStatus('success');
        setDatabases(data.databases);
        setStep(2);
      } else {
        setConnectionStatus('error');
        setUploadMessage(data.message);
      }
    } catch (error) {
      setConnectionStatus('error');
      setUploadMessage('Failed to connect to MySQL server');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const uploadAndProcess = async () => {
    if (selectedFiles.length === 0) {
      setUploadMessage('Please select CSV files');
      return;
    }

    setUploadStatus('uploading');
    setUploadMessage('Uploading files...');

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));
    formData.append('database', config.database);

    try {
      const uploadResponse = await fetch('http://localhost:5000/api/upload-csv', {
        method: 'POST',
        body: formData
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        throw new Error(uploadData.error);
      }

      setUploadStatus('processing');
      setUploadMessage('Processing CSV files to MySQL...');

      const processResponse = await fetch('http://localhost:5000/api/process-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          drop_existing: dropExisting
        })
      });

      const processData = await processResponse.json();

      if (processData.success) {
        setUploadStatus('success');
        setUploadMessage(`Successfully loaded ${processData.details.successful} tables with ${processData.details.total_rows.toLocaleString()} total rows`);
        setTimeout(() => onComplete(), 2000);
      } else {
        throw new Error(processData.error);
      }

    } catch (error) {
      setUploadStatus('error');
      setUploadMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-600/20 flex items-center justify-center border-2 border-purple-500">
            <Database className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Database Setup</h1>
          <p className="text-gray-400">Connect to MySQL and upload your data</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Progress Steps */}
          <div className="flex border-b border-gray-700">
            <div className={`flex-1 p-4 text-center ${step >= 1 ? 'bg-purple-600/20 border-b-2 border-purple-500' : 'bg-gray-800/50'}`}>
              <Server className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-sm font-semibold text-gray-300">Connect</div>
            </div>
            <div className={`flex-1 p-4 text-center ${step >= 2 ? 'bg-purple-600/20 border-b-2 border-purple-500' : 'bg-gray-800/50'}`}>
              <Upload className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-sm font-semibold text-gray-300">Upload</div>
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Connection */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">MySQL Connection</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Host</label>
                  <input
                    type="text"
                    value={config.host}
                    onChange={(e) => setConfig({...config, host: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="localhost"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">User</label>
                    <input
                      type="text"
                      value={config.user}
                      onChange={(e) => setConfig({...config, user: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="root"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Port</label>
                    <input
                      type="text"
                      value={config.port}
                      onChange={(e) => setConfig({...config, port: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="3306"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={config.password}
                    onChange={(e) => setConfig({...config, password: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Database Name</label>
                  <input
                    type="text"
                    value={config.database}
                    onChange={(e) => setConfig({...config, database: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="adani_data"
                  />
                </div>

                {connectionStatus === 'error' && (
                  <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-200 font-semibold">Connection Failed</p>
                      <p className="text-red-300 text-sm mt-1">{uploadMessage}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={testConnection}
                  disabled={connectionStatus === 'testing'}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  {connectionStatus === 'testing' ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Testing Connection...
                    </>
                  ) : (
                    <>
                      <Database className="w-5 h-5" />
                      Test Connection
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 2: Upload */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-green-200 font-semibold">Connected Successfully</p>
                    <p className="text-green-300 text-sm">Found {databases.length} databases</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white">Upload CSV Files</h2>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-all">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <input
                    type="file"
                    multiple
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <span className="text-purple-400 hover:text-purple-300 font-semibold">
                      Choose CSV files
                    </span>
                    <span className="text-gray-400"> or drag and drop</span>
                  </label>
                  <p className="text-gray-500 text-sm mt-2">Upload multiple CSV files at once</p>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-white">{selectedFiles.length} files selected</span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedFiles.map((file, i) => (
                        <div key={i} className="text-sm text-gray-300 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 bg-gray-700/30 p-4 rounded-lg">
                  <input
                    type="checkbox"
                    id="drop-existing"
                    checked={dropExisting}
                    onChange={(e) => setDropExisting(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <label htmlFor="drop-existing" className="text-gray-300 cursor-pointer">
                    Drop existing tables before upload
                  </label>
                </div>

                {uploadStatus !== 'idle' && (
                  <div className={`rounded-lg p-4 flex items-start gap-3 ${
                    uploadStatus === 'success' ? 'bg-green-900/50 border border-green-700' :
                    uploadStatus === 'error' ? 'bg-red-900/50 border border-red-700' :
                    'bg-blue-900/50 border border-blue-700'
                  }`}>
                    {uploadStatus === 'success' ? <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> :
                     uploadStatus === 'error' ? <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" /> :
                     <Loader className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 animate-spin" />}
                    <div>
                      <p className={`font-semibold ${
                        uploadStatus === 'success' ? 'text-green-200' :
                        uploadStatus === 'error' ? 'text-red-200' :
                        'text-blue-200'
                      }`}>
                        {uploadStatus === 'uploading' ? 'Uploading...' :
                         uploadStatus === 'processing' ? 'Processing...' :
                         uploadStatus === 'success' ? 'Success!' : 'Error'}
                      </p>
                      <p className={`text-sm mt-1 ${
                        uploadStatus === 'success' ? 'text-green-300' :
                        uploadStatus === 'error' ? 'text-red-300' :
                        'text-blue-300'
                      }`}>{uploadMessage}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={uploadAndProcess}
                    disabled={selectedFiles.length === 0 || uploadStatus === 'uploading' || uploadStatus === 'processing'}
                    className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    {(uploadStatus === 'uploading' || uploadStatus === 'processing') ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload & Process
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;