import React, { useState, useEffect } from 'react';
import { 
  Wand2, Sparkles, Brain, Loader2, CheckCircle, 
  ArrowRight, Cloud, Database, FileText, Server,
  Zap, Bot, Cpu, Search, Shield, Check
} from 'lucide-react';

interface AIWizardFlowProps {
  onComplete: (config: any) => void;
  onCancel: () => void;
}

export default function AIWizardFlow({ onComplete, onCancel }: AIWizardFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedSources, setDetectedSources] = useState<any[]>([]);
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [aiProgress, setAiProgress] = useState(0);
  const [configGenerated, setConfigGenerated] = useState(false);

  useEffect(() => {
    if (currentStep === 1) {
      startScanning();
    }
  }, [currentStep]);

  const startScanning = () => {
    setIsScanning(true);
    setAiProgress(0);
    
    const interval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeScanning();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const completeScanning = () => {
    setTimeout(() => {
      setDetectedSources([
        {
          id: 'gcs-analytics',
          type: 'gcs',
          name: 'Analytics Data Lake',
          bucket: 'acme-analytics-prod',
          confidence: 95,
          details: {
            projectId: 'acme-analytics-prod',
            region: 'us-central1',
            tables: 12,
            dataSize: '2.3TB',
            format: 'parquet'
          }
        },
        {
          id: 'bq-marketing',
          type: 'bigquery',
          name: 'Marketing Dataset',
          dataset: 'marketing_analytics',
          confidence: 88,
          details: {
            projectId: 'acme-marketing-data',
            location: 'US',
            tables: 8,
            dataSize: '450GB'
          }
        },
        {
          id: 's3-events',
          type: 's3',
          name: 'Event Stream Archive',
          bucket: 'acme-event-stream',
          confidence: 76,
          details: {
            region: 'us-east-1',
            files: 1842,
            dataSize: '890GB',
            format: 'json'
          }
        }
      ]);
      setIsScanning(false);
      setCurrentStep(2);
    }, 500);
  };

  const handleSourceSelect = (source: any) => {
    setSelectedSource(source);
  };

  const generateConfiguration = () => {
    setConfigGenerated(true);
    setTimeout(() => {
      const config = {
        connectionName: selectedSource.name,
        gcpProjectId: selectedSource.details.projectId,
        bucketRegion: selectedSource.details.region,
        bucketName: selectedSource.bucket,
        schemaPrefix: 'analytics/events',
        dataFormat: selectedSource.details.format || 'parquet',
        dataPartitioning: 'all-partitioned',
        serviceAccountKey: JSON.stringify({
          type: 'service_account',
          project_id: selectedSource.details.projectId,
          private_key_id: 'auto_generated_key',
          client_email: 'connection@permutive.iam.gserviceaccount.com'
        }, null, 2)
      };
      onComplete(config);
    }, 2000);
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Welcome Step */}
      {currentStep === 0 && (
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wand2 className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                AI Wizard Connector
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Let me automatically detect and configure your data sources. 
                I'll scan your cloud environment and set up the optimal connection in seconds.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Search className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Auto-detect sources</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Smart configuration</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Instant setup</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={onCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg flex items-center space-x-2"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Start AI Detection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanning Step */}
      {currentStep === 1 && isScanning && (
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-purple-300 animate-ping"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Scanning Your Environment</h2>
                <p className="text-gray-600">AI is analyzing your cloud resources...</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  {aiProgress >= 20 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                  )}
                  <span className={aiProgress >= 20 ? 'text-green-700' : 'text-gray-600'}>
                    Authenticating cloud accounts
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {aiProgress >= 40 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : aiProgress >= 20 ? (
                    <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={aiProgress >= 40 ? 'text-green-700' : aiProgress >= 20 ? 'text-gray-600' : 'text-gray-400'}>
                    Discovering data sources
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {aiProgress >= 60 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : aiProgress >= 40 ? (
                    <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={aiProgress >= 60 ? 'text-green-700' : aiProgress >= 40 ? 'text-gray-600' : 'text-gray-400'}>
                    Analyzing schemas and structures
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {aiProgress >= 80 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : aiProgress >= 60 ? (
                    <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={aiProgress >= 80 ? 'text-green-700' : aiProgress >= 60 ? 'text-gray-600' : 'text-gray-400'}>
                    Evaluating data quality
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {aiProgress >= 100 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : aiProgress >= 80 ? (
                    <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={aiProgress >= 100 ? 'text-green-700' : aiProgress >= 80 ? 'text-gray-600' : 'text-gray-400'}>
                    Generating recommendations
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${aiProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Step */}
      {currentStep === 2 && !isScanning && (
        <div className="h-full p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Found {detectedSources.length} Data Sources
                </h2>
                <p className="text-gray-600">Select the source you'd like to connect</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {detectedSources.map(source => (
                  <div
                    key={source.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedSource?.id === source.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => handleSourceSelect(source)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          source.type === 'gcs' ? 'bg-blue-100' :
                          source.type === 'bigquery' ? 'bg-blue-600' :
                          'bg-orange-100'
                        }`}>
                          {source.type === 'gcs' && <Cloud className="h-6 w-6 text-blue-600" />}
                          {source.type === 'bigquery' && <Database className="h-6 w-6 text-white" />}
                          {source.type === 's3' && <Server className="h-6 w-6 text-orange-600" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{source.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              source.confidence >= 90 ? 'bg-green-100 text-green-700' :
                              source.confidence >= 75 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {source.confidence}% confidence
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {source.type === 'gcs' && `GCS Bucket: ${source.bucket}`}
                            {source.type === 'bigquery' && `BigQuery Dataset: ${source.dataset}`}
                            {source.type === 's3' && `S3 Bucket: ${source.bucket}`}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{source.details.tables || source.details.files} tables/files</span>
                            <span>•</span>
                            <span>{source.details.dataSize}</span>
                            <span>•</span>
                            <span>{source.details.region || source.details.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {selectedSource?.id === source.id && (
                        <Check className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                
                <button
                  onClick={generateConfiguration}
                  disabled={!selectedSource}
                  className={`px-8 py-3 rounded-lg flex items-center space-x-2 ${
                    selectedSource
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Wand2 className="h-5 w-5" />
                  <span>Configure with AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}