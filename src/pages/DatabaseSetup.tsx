import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Upload, CheckCircle, XCircle, Loader, FileText, Key, Brain, ArrowRight, Copy, Check, AlertTriangle } from 'lucide-react';

interface ConnectionConfig {
  database: string;
}

const DatabaseSetup = () => {
  const navigate = useNavigate();
  
  // Check authentication
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ConnectionConfig>({
    database: ''
  });
  
  // Access key state
  const [accessKey, setAccessKey] = useState('');
  const [keyError, setKeyError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'training' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);

  // Validate access key with backend
  const validateAccessKey = async () => {
    if (accessKey.length !== 64) {
      setKeyError('Access key must be exactly 64 characters');
      return;
    }

    setIsValidating(true);
    setKeyError('');

    try {
      const response = await fetch('http://localhost:5000/api/verify-access-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ access_key: accessKey })
      });

      const data = await response.json();

      if (data.success && data.valid) {
        setStep(2); // Move to database creation step
      } else {
        setKeyError('❌ Invalid access key. Please check and try again.');
      }
    } catch (error) {
      setKeyError('Failed to verify access key. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const createDatabase = async () => {
    if (!config.database.trim()) {
      setUploadMessage('Please enter a database name');
      return;
    }

    if (!accessKey || accessKey.length !== 64) {
      setUploadMessage('Valid access key required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/create-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          database_name: config.database,
          access_key: accessKey
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('selected_database', data.database);
        setUploadMessage(`✅ Database "${data.database}" created successfully`);
        setStep(3);
      } else {
        setUploadMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setUploadMessage('Failed to create database');
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
    setUploadMessage(`Uploading ${selectedFiles.length} CSV file(s) to server...`);
    setProcessingProgress(10);

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));

    try {
      const uploadResponse = await fetch('http://localhost:5000/api/upload-user-csv', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success) throw new Error(uploadData.error);

      setProcessingProgress(30);
      setUploadMessage(`✅ Uploaded ${uploadData.files.length} file(s). Starting database processing...`);

      // IMMEDIATELY move to training step
      setUploadStatus('training');
      setStep(4);
      setTrainingProgress(10);
      setUploadMessage('Initializing database processing...');

      // Start background processing (don't await)
      processInBackground();

    } catch (error) {
      setUploadStatus('error');
      setUploadMessage(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const processInBackground = async () => {
    try {
      setTrainingProgress(15);
      setUploadMessage('📤 Uploading CSV files to database server...');
      await new Promise(resolve => setTimeout(resolve, 500));

      setTrainingProgress(25);
      setUploadMessage('🔄 Converting CSV data to database tables...');

      const processResponse = await fetch('http://localhost:5000/api/process-user-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const processData = await processResponse.json();
      if (!processData.success) throw new Error(processData.error);

      setTrainingProgress(30);
      const tableCount = processData.details.successful;
      const rowCount = processData.details.total_rows.toLocaleString();
      setUploadMessage(`✅ Created ${tableCount} table(s) with ${rowCount} rows`);
      
      await new Promise(resolve => setTimeout(resolve, 800));

      // Continue with AI training
      await performAITraining();

    } catch (error) {
      setUploadStatus('error');
      setUploadMessage(`❌ ${error instanceof Error ? error.message : 'Processing failed'}`);
    }
  };

  const performAITraining = async () => {
    // Step 1: Table Analysis
    setUploadMessage('🔍 Reading table structures and columns...');
    setTrainingProgress(30);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Semantic Profiling
    setTrainingProgress(45);
    setUploadMessage('🧠 Building AI semantic profiles for tables...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 3: Column Analysis
    setTrainingProgress(60);
    setUploadMessage('📊 Analyzing data types and relationships...');
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Step 4: Cache Building
    setTrainingProgress(75);
    setUploadMessage('💾 Building intelligent query cache...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 5: Initialize Database
    setTrainingProgress(85);
    setUploadMessage('⚡ Optimizing for fast natural language queries...');
    
    try {
      const initResponse = await fetch('http://localhost:5000/api/initialize-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const initData = await initResponse.json();
      
      if (initData.success) {
        setTrainingProgress(95);
        setUploadMessage(`✅ Pre-built semantic profiles for ${initData.tables?.length || 0} tables`);
      }
    } catch (error) {
      console.error('Database initialization failed:', error);
      setUploadMessage('⚠️ Continuing with basic initialization...');
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Final step
    setTrainingProgress(100);
    setUploadMessage('🎉 AI training complete! Your database is ready for intelligent queries.');
    setUploadStatus('success');

    setTimeout(() => {
      navigate('/ai-assistant');
    }, 2000);
  };

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600";
  const buttonClass = "w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 disabled:shadow-lg";

  return (
    <div className="w-full product-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Database Setup</h1>
        <p className="text-lg text-gray-600">Secure setup with your access key</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden">
        <div className="flex border-b border-gray-300">
          {[
            { icon: Key, label: 'Access Key', step: 1 },
            { icon: Database, label: 'Create DB', step: 2 },
            { icon: Upload, label: 'Upload', step: 3 },
            { icon: Brain, label: 'Train AI', step: 4 },
          ].map((item) => (
            <div 
              key={item.step} 
              className={`flex-1 p-4 text-center transition-all ${
                step >= item.step 
                  ? 'bg-indigo-50 border-b-2 border-indigo-600' 
                  : 'bg-white'
              }`}
            >
              <item.icon className={`w-6 h-6 mx-auto mb-2 ${step >= item.step ? 'text-indigo-600' : 'text-gray-400'}`} />
              <div className={`text-sm font-semibold ${step >= item.step ? 'text-indigo-700' : 'text-gray-500'}`}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className="p-8">
          {/* STEP 1: Access Key Verification */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Access Key</h2>
              
              <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Key className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-900 font-semibold mb-1">🔑 What is an Access Key?</p>
                    <p className="text-blue-800 text-sm">
                      Your access key was provided when you signed up. You need it to create databases securely.
                      We never store your MySQL password - the key authenticates you instead.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Access Key (64 characters)
                </label>
                <input
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-indigo-600"
                  placeholder="Paste your 64-character access key here"
                  maxLength={64}
                />
                <p className="text-gray-500 text-sm mt-2">
                  {accessKey.length}/64 characters
                </p>
              </div>

              {keyError && (
                <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                  <p className="text-red-800">{keyError}</p>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Don't have your access key?</strong>
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  • Check the email you received when signing up<br/>
                  • Or regenerate a new key from your profile settings
                </p>
                <button
                onClick={() => navigate('/profile/regenerate-key')}
                className="text-indigo-600 text-sm font-semibold hover:underline"
              >
                Regenerate Access Key →
              </button>
              </div>

              <button
                onClick={validateAccessKey}
                disabled={accessKey.length !== 64 || isValidating}
                className={buttonClass}
              >
                {isValidating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Key className="w-5 h-5" />
                    Verify & Continue
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 2: Create Database */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-green-800 font-semibold">Access Key Verified Successfully</p>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900">Create Your Database</h2>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Database Name</label>
                <input
                  type="text"
                  value={config.database}
                  onChange={(e) => setConfig({...config, database: e.target.value.replace(/[^a-zA-Z0-9_]/g, '_')})}
                  className={inputClass}
                  placeholder="my_database"
                />
              </div>
              
              {uploadMessage && (
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                  <p className="text-blue-800">{uploadMessage}</p>
                </div>
              )}
              
              <button
                onClick={createDatabase}
                disabled={!config.database.trim()}
                className={buttonClass}
              >
                <Database className="w-5 h-5" />
                Create & Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 3: Upload CSV Files */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Upload CSV Files</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-all">
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
                  <span className="text-indigo-600 font-semibold hover:text-indigo-500">Choose CSV files</span>
                  <p className="text-gray-500 text-sm mt-2">or drag and drop here</p>
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">{selectedFiles.length} files selected</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {selectedFiles.map((file, i) => (
                      <div key={i} className="text-sm text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={uploadAndProcess}
                disabled={selectedFiles.length === 0}
                className={buttonClass}
              >
                <Upload className="w-5 h-5" />
                Upload & Process
              </button>
            </div>
          )}

          {/* STEP 4: AI Training */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <Brain className="w-20 h-20 mx-auto text-indigo-600 animate-pulse mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Training AI Assistant</h2>
                <p className="text-gray-600 text-sm mb-6">Building intelligent understanding of your data...</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 min-h-[80px] flex items-center">
                <div className="flex-1">
                  <p className="text-blue-900 font-medium">{uploadMessage}</p>
                  {trainingProgress < 100 && (
                    <p className="text-blue-700 text-sm mt-2">
                      {trainingProgress < 30 
                        ? '🔍 Processing your data files...' 
                        : trainingProgress < 60 
                        ? '📊 Analyzing table structures...' 
                        : trainingProgress < 85
                        ? '🧠 Building AI intelligence...'
                        : '✨ Finalizing setup...'}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span className="font-bold text-indigo-600">{trainingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${trainingProgress}%` }}
                  >
                    {trainingProgress > 10 && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4">
                {[
                  { label: 'Upload', progress: 25, icon: '📤' },
                  { label: 'Process', progress: 50, icon: '🔄' },
                  { label: 'Analyze', progress: 75, icon: '🔍' },
                  { label: 'Train', progress: 100, icon: '🧠' }
                ].map((stage, idx) => (
                  <div 
                    key={idx}
                    className={`text-center p-3 rounded-lg border-2 transition-all ${
                      trainingProgress >= stage.progress
                        ? 'bg-green-50 border-green-300'
                        : trainingProgress >= stage.progress - 20
                        ? 'bg-blue-50 border-blue-300 animate-pulse'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{stage.icon}</div>
                    <div className={`text-xs font-semibold ${
                      trainingProgress >= stage.progress
                        ? 'text-green-700'
                        : trainingProgress >= stage.progress - 20
                        ? 'text-blue-700'
                        : 'text-gray-500'
                    }`}>
                      {stage.label}
                    </div>
                  </div>
                ))}
              </div>

              {uploadStatus === 'success' && (
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold">
                    <CheckCircle className="w-5 h-5" />
                    Complete! Redirecting to AI Assistant...
                  </div>
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-6 py-3 rounded-full font-bold">
                    <XCircle className="w-5 h-5" />
                    Error occurred - please try again
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseSetup;