'use client';

import { useState } from 'react';
import { Cloud, CheckCircle, AlertCircle, Settings, Database, ArrowRight, Shield, Activity } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('setup');
  const [projectId, setProjectId] = useState('');
  const [bucketName, setBucketName] = useState('');
  const [serviceAccount, setServiceAccount] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setConnectionStatus('success');
    }, 2000);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-permutive-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-permutive-blue" />
              <span className="text-xl font-semibold text-permutive-gray-900">Permutive Connect</span>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-permutive-gray-600 hover:text-permutive-blue">Documentation</a>
              <a href="#" className="text-permutive-gray-600 hover:text-permutive-blue">Support</a>
              <a href="#" className="text-permutive-gray-600 hover:text-permutive-blue">API</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-permutive-gray-900">Google Cloud Storage Connection</h1>
          <p className="mt-2 text-permutive-gray-600">Connect your GCS bucket to enable data export and automation</p>
        </div>

        {/* Connection Status Banner */}
        {connectionStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-green-800">Successfully connected to Google Cloud Storage!</span>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-permutive-gray-200">
          <div className="border-b border-permutive-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('setup')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'setup'
                    ? 'border-permutive-blue text-permutive-blue'
                    : 'border-transparent text-permutive-gray-600 hover:text-permutive-gray-900'
                }`}
              >
                <Settings className="inline h-4 w-4 mr-2" />
                Setup
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'permissions'
                    ? 'border-permutive-blue text-permutive-blue'
                    : 'border-transparent text-permutive-gray-600 hover:text-permutive-gray-900'
                }`}
              >
                <Shield className="inline h-4 w-4 mr-2" />
                Permissions
              </button>
              <button
                onClick={() => setActiveTab('monitoring')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'monitoring'
                    ? 'border-permutive-blue text-permutive-blue'
                    : 'border-transparent text-permutive-gray-600 hover:text-permutive-gray-900'
                }`}
              >
                <Activity className="inline h-4 w-4 mr-2" />
                Monitoring
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'setup' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-permutive-gray-900 mb-4">Configure GCS Connection</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="projectId" className="block text-sm font-medium text-permutive-gray-700 mb-2">
                        GCP Project ID
                      </label>
                      <input
                        type="text"
                        id="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        className="input-field"
                        placeholder="my-gcp-project-123"
                      />
                      <p className="mt-1 text-sm text-permutive-gray-500">The ID of your Google Cloud Platform project</p>
                    </div>

                    <div>
                      <label htmlFor="bucketName" className="block text-sm font-medium text-permutive-gray-700 mb-2">
                        Bucket Name
                      </label>
                      <input
                        type="text"
                        id="bucketName"
                        value={bucketName}
                        onChange={(e) => setBucketName(e.target.value)}
                        className="input-field"
                        placeholder="my-data-bucket"
                      />
                      <p className="mt-1 text-sm text-permutive-gray-500">The name of your GCS bucket for data export</p>
                    </div>

                    <div>
                      <label htmlFor="serviceAccount" className="block text-sm font-medium text-permutive-gray-700 mb-2">
                        Service Account Email
                      </label>
                      <input
                        type="email"
                        id="serviceAccount"
                        value={serviceAccount}
                        onChange={(e) => setServiceAccount(e.target.value)}
                        className="input-field"
                        placeholder="service-account@project.iam.gserviceaccount.com"
                      />
                      <p className="mt-1 text-sm text-permutive-gray-500">The email address of your service account</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-permutive-gray-200">
                  <button
                    onClick={handleConnect}
                    disabled={isConnecting || !projectId || !bucketName || !serviceAccount}
                    className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        Connect to GCS
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                  <button className="btn-secondary">Test Connection</button>
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-permutive-gray-900 mb-4">Required Permissions</h2>
                <div className="bg-permutive-lightblue p-4 rounded-lg">
                  <h3 className="font-medium text-permutive-blue mb-2">Service Account Permissions</h3>
                  <p className="text-sm text-permutive-gray-700 mb-3">
                    Your service account needs the following roles on the GCS bucket:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <code className="text-sm bg-permutive-gray-100 px-2 py-1 rounded">roles/storage.objectCreator</code>
                        <p className="text-sm text-permutive-gray-600 mt-1">Allows creating new objects in the bucket</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <code className="text-sm bg-permutive-gray-100 px-2 py-1 rounded">roles/storage.objectViewer</code>
                        <p className="text-sm text-permutive-gray-600 mt-1">Allows reading objects from the bucket</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="font-medium text-permutive-gray-900 mb-3">Setup Instructions</h3>
                  <ol className="space-y-3 text-sm text-permutive-gray-700">
                    <li>1. Go to the Google Cloud Console IAM page</li>
                    <li>2. Select your project from the dropdown</li>
                    <li>3. Click "Add" to add a new member</li>
                    <li>4. Enter the Permutive service account email</li>
                    <li>5. Assign the required roles listed above</li>
                    <li>6. Click "Save" to apply the permissions</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-permutive-gray-900 mb-4">Connection Monitoring</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-permutive-gray-600">Status</span>
                      <Database className="h-4 w-4 text-permutive-gray-400" />
                    </div>
                    <p className="text-2xl font-semibold text-green-600">Connected</p>
                    <p className="text-xs text-permutive-gray-500 mt-1">Last checked: 2 min ago</p>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-permutive-gray-600">Files Exported</span>
                      <Activity className="h-4 w-4 text-permutive-gray-400" />
                    </div>
                    <p className="text-2xl font-semibold text-permutive-gray-900">1,234</p>
                    <p className="text-xs text-permutive-gray-500 mt-1">Last 24 hours</p>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-permutive-gray-600">Data Transferred</span>
                      <Cloud className="h-4 w-4 text-permutive-gray-400" />
                    </div>
                    <p className="text-2xl font-semibold text-permutive-gray-900">2.3 GB</p>
                    <p className="text-xs text-permutive-gray-500 mt-1">This month</p>
                  </div>
                </div>

                <div className="card">
                  <h3 className="font-medium text-permutive-gray-900 mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { time: '10:32 AM', event: 'Data export completed', status: 'success' },
                      { time: '10:15 AM', event: 'Export initiated for audience segment', status: 'info' },
                      { time: '09:45 AM', event: 'Connection test successful', status: 'success' },
                      { time: '09:30 AM', event: 'Configuration updated', status: 'info' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-permutive-gray-100 last:border-0">
                        <div className="flex items-center">
                          <span className="text-xs text-permutive-gray-500 w-16">{item.time}</span>
                          <span className="text-sm text-permutive-gray-700 ml-4">{item.event}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}