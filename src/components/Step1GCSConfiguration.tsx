import React from 'react';
import { 
  Cloud, CheckCircle, Settings, Database, ArrowRight, 
  Shield, Activity, Brain, Sparkles, FileCode, FileText,
  User, Calendar, Hash, Tag, Clock, MapPin, Link,
  AlertTriangle, Info, ChevronRight, Loader2, Download,
  ThumbsUp, RefreshCw, Zap, BarChart3, Users
} from 'lucide-react';

interface Step1GCSConfigurationProps {
  gcsConfig: any;
  setGcsConfig: (config: any) => void;
  intelligenceMode: boolean;
  setIntelligenceMode: (mode: boolean) => void;
  suggestedConfigs: any[];
  applySuggestion: (suggestion: any) => void;
  gcpAccess: 'none' | 'checking' | 'available';
  gcpProjects: any[];
  gcpBuckets: any[];
  setGcpBuckets: (buckets: any[]) => void;
  gcsRegions: any[];
  handleGcsConfiguration: () => void;
  checkIamPermissions: () => void;
}

export default function Step1GCSConfiguration({
  gcsConfig,
  setGcsConfig,
  intelligenceMode,
  setIntelligenceMode,
  suggestedConfigs,
  applySuggestion,
  gcpAccess,
  gcpProjects,
  gcpBuckets,
  setGcpBuckets,
  gcsRegions,
  handleGcsConfiguration,
  checkIamPermissions
}: Step1GCSConfigurationProps) {
  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure GCS Connection</h2>
          <p className="text-gray-600">Enter your Google Cloud Storage bucket details following Permutive's structure requirements</p>
        </div>

        {/* Intelligence Toggle */}
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Intelligence Mode</h3>
                <p className="text-sm text-gray-600">Get smart suggestions and auto-population</p>
              </div>
            </div>
            <button
              onClick={() => setIntelligenceMode(!intelligenceMode)}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                intelligenceMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ${
                  intelligenceMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {intelligenceMode && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-700 font-medium">Enhanced mode active</span>
              </div>
              {gcpAccess === 'available' && suggestedConfigs.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Smart Suggestions</h4>
                  <div className="grid gap-2">
                    {suggestedConfigs.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion(suggestion)}
                        className="text-left p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{suggestion.connectionSuggestion}</div>
                            <div className="text-xs text-gray-600">{suggestion.name} • {suggestion.projectId}</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-purple-600" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Configuration Form */}
        <div className="space-y-6">
          {/* Connection Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connection Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Production Analytics Data"
              value={gcsConfig.connectionName}
              onChange={(e) => setGcsConfig({...gcsConfig, connectionName: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">A descriptive name for this data connection</p>
          </div>

          {/* GCP Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GCP Project ID *
            </label>
            {gcpAccess === 'available' ? (
              <div className="space-y-2">
                <select
                  value={gcsConfig.gcpProjectId}
                  onChange={(e) => {
                    setGcsConfig({...gcsConfig, gcpProjectId: e.target.value});
                    const selectedProject = gcpProjects.find(p => p.projectId === e.target.value);
                    if (selectedProject && selectedProject.suggestedBuckets) {
                      setGcpBuckets(selectedProject.suggestedBuckets);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a project...</option>
                  {gcpProjects.map(project => (
                    <option key={project.projectId} value={project.projectId}>
                      {project.name} ({project.projectId})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-green-600 flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>
                    {gcpProjects.length > 0 
                      ? `Found ${gcpProjects.length} projects in your GCP account`
                      : 'Loading projects...'
                    }
                  </span>
                </p>
              </div>
            ) : (
              <input
                type="text"
                placeholder="e.g., my-analytics-project"
                value={gcsConfig.gcpProjectId}
                onChange={(e) => setGcsConfig({...gcsConfig, gcpProjectId: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          {/* Bucket Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bucket Region *
            </label>
            <select
              value={gcsConfig.bucketRegion}
              onChange={(e) => setGcsConfig({...gcsConfig, bucketRegion: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select region...</option>
              {gcsRegions.map(region => (
                <option key={region.id} value={region.id}>
                  {region.name} ({region.id})
                </option>
              ))}
            </select>
          </div>

          {/* Bucket Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bucket Name *
            </label>
            {gcpAccess === 'available' && gcpBuckets.length > 0 ? (
              <div className="space-y-2">
                <select
                  value={gcsConfig.bucketName}
                  onChange={(e) => setGcsConfig({...gcsConfig, bucketName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a bucket...</option>
                  {gcpBuckets
                    .filter(bucket => bucket.region === gcsConfig.bucketRegion || !gcsConfig.bucketRegion)
                    .map(bucket => (
                      <option key={bucket.name} value={bucket.name}>
                        {bucket.name} ({bucket.region})
                      </option>
                    ))}
                </select>
                <p className="text-xs text-blue-600 flex items-center space-x-1">
                  <Info className="h-3 w-3" />
                  <span>Showing buckets from your GCP account</span>
                </p>
              </div>
            ) : (
              <input
                type="text"
                placeholder="e.g., my-analytics-bucket"
                value={gcsConfig.bucketName}
                onChange={(e) => setGcsConfig({...gcsConfig, bucketName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          {/* Schema Prefix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schema Prefix
            </label>
            {intelligenceMode && gcsConfig.bucketName && (
              <div className="mb-2 text-xs text-purple-600 bg-purple-50 p-2 rounded flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>AI suggests analyzing common prefixes in this bucket</span>
              </div>
            )}
            <div className="space-y-2">
              {gcpAccess === 'available' && gcpBuckets.find(b => b.name === gcsConfig.bucketName)?.discoveredPrefixes?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">Discovered prefixes:</p>
                  {gcpBuckets.find(b => b.name === gcsConfig.bucketName)?.discoveredPrefixes
                    .slice(0, 3)
                    .map((prefix: string) => (
                      <button
                        key={prefix}
                        onClick={() => setGcsConfig({...gcsConfig, schemaPrefix: prefix})}
                        className="block w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border text-sm"
                      >
                        {prefix}
                      </button>
                    ))}
                </div>
              )}
              <input
                type="text"
                placeholder="e.g., analytics/events"
                value={gcsConfig.schemaPrefix}
                onChange={(e) => setGcsConfig({...gcsConfig, schemaPrefix: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Optional: folder path within the bucket (e.g., analytics/events)</p>
          </div>

          {/* Data Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Format *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGcsConfig({...gcsConfig, dataFormat: 'parquet'})}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
                  gcsConfig.dataFormat === 'parquet' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileCode className="h-4 w-4" />
                  <span>Parquet (Recommended)</span>
                </div>
                <p className="text-xs mt-1 text-gray-500">Columnar format with ZSTD compression</p>
              </button>
              <button
                type="button"
                onClick={() => setGcsConfig({...gcsConfig, dataFormat: 'csv'})}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
                  gcsConfig.dataFormat === 'csv' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>CSV</span>
                </div>
                <p className="text-xs mt-1 text-gray-500">Supports .csv and .gz formats</p>
              </button>
            </div>
          </div>

          {/* Data Partitioning */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Partitioning *
            </label>
            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="partitioning"
                  value="all-partitioned"
                  checked={gcsConfig.dataPartitioning === 'all-partitioned'}
                  onChange={(e) => setGcsConfig({...gcsConfig, dataPartitioning: e.target.value})}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">All tables are partitioned</div>
                  <p className="text-xs text-gray-500 mt-1">
                    Tables use Hive-style partitioning (e.g., date=2025-01-01/region=EU)
                  </p>
                </div>
              </label>
              <label className="flex items-start space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="partitioning"
                  value="none-partitioned"
                  checked={gcsConfig.dataPartitioning === 'none-partitioned'}
                  onChange={(e) => setGcsConfig({...gcsConfig, dataPartitioning: e.target.value})}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">No tables are partitioned</div>
                  <p className="text-xs text-gray-500 mt-1">
                    All files under table directories are treated as a flat table
                  </p>
                </div>
              </label>
            </div>
            {intelligenceMode && gcsConfig.schemaPrefix && (
              <div className="mt-2 text-xs text-purple-600 bg-purple-50 p-2 rounded flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>AI detected Hive-style partitions in your data structure</span>
              </div>
            )}
          </div>

          {/* Service Account Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Account Key (JSON) *
            </label>
            <textarea
              placeholder="Paste your service account JSON key here..."
              value={gcsConfig.serviceAccountKey}
              onChange={(e) => setGcsConfig({...gcsConfig, serviceAccountKey: e.target.value})}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              JSON key file for authentication. 
              <a href="#" className="text-blue-600 hover:underline ml-1">Learn how to create one</a>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
          <button
            onClick={() => handleGcsConfiguration()}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={checkIamPermissions}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Verify IAM Permissions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}