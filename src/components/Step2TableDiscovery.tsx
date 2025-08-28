import React from 'react';
import { 
  Database, ArrowRight, Shield, Brain, Table, 
  FileCode, Check, Calendar, Hash, Tag, Clock, MapPin,
  AlertTriangle, Info, ChevronRight, Loader2, Eye
} from 'lucide-react';

interface Step2TableDiscoveryProps {
  discoveredStructure: any;
  handleTableSelect: (table: any) => void;
  discoverBucketStructure: () => void;
  setCurrentStep: (step: number) => void;
  setMaxStepReached: (step: number) => void;
  maxStepReached: number;
}

export default function Step2TableDiscovery({
  discoveredStructure,
  handleTableSelect,
  discoverBucketStructure,
  setCurrentStep,
  setMaxStepReached,
  maxStepReached
}: Step2TableDiscoveryProps) {
  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Available Tables</h2>
          <p className="text-gray-600">Explore the data structure in your GCS bucket and select tables to connect</p>
        </div>

        {!discoveredStructure ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Discover Tables</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Click the button below to analyze your GCS bucket structure and discover available data tables.
            </p>
            <button
              onClick={discoverBucketStructure}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
            >
              <Database className="h-5 w-5" />
              <span>Discover Tables</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Bucket Info */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Bucket Connected Successfully</h3>
                  <p className="text-sm text-green-700">
                    Found {discoveredStructure.discoveredTables?.length || 0} tables in schema prefix: {discoveredStructure.schemaPrefix}
                  </p>
                </div>
              </div>
            </div>

            {/* Tables Grid */}
            <div className="grid gap-6">
              {discoveredStructure.discoveredTables?.map((table: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => handleTableSelect(table)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Table className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {table.name}
                          </h3>
                          <p className="text-sm text-gray-600">{table.path}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{table.fileCount} files</div>
                          <div className="text-xs text-gray-500">{table.dataFormat?.toUpperCase()}</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    {/* Table Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700">Data Format</div>
                        <div className="flex items-center space-x-1">
                          <FileCode className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-900">{table.dataFormat}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700">Partitioned</div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-900">
                            {table.isPartitioned ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700">Columns</div>
                        <div className="flex items-center space-x-1">
                          <Hash className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-900">{table.sampleColumns?.length || 0}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-700">Est. Size</div>
                        <div className="flex items-center space-x-1">
                          <Database className="h-3 w-3 text-gray-500" />
                          <span className="text-sm text-gray-900">{table.estimatedSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sample Columns Preview */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="text-xs font-medium text-gray-700 mb-2">Sample Columns</div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {table.sampleColumns?.slice(0, 4).map((col: any, colIndex: number) => (
                          <div key={colIndex} className="bg-gray-50 rounded px-2 py-1">
                            <div className="text-xs font-medium text-gray-800">{col.name}</div>
                            <div className="text-xs text-gray-600">{col.type}</div>
                          </div>
                        ))}
                        {table.sampleColumns?.length > 4 && (
                          <div className="bg-gray-50 rounded px-2 py-1 flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{table.sampleColumns.length - 4} more</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Partitions Preview */}
                    {table.isPartitioned && table.partitions?.length > 0 && (
                      <div className="border-t border-gray-100 pt-4 mt-4">
                        <div className="text-xs font-medium text-gray-700 mb-2">Recent Partitions</div>
                        <div className="flex flex-wrap gap-2">
                          {table.partitions.slice(0, 3).map((partition: string, pIndex: number) => (
                            <span key={pIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {partition}
                            </span>
                          ))}
                          {table.partitions.length > 3 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              +{table.partitions.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center space-x-2 px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Back to Configuration</span>
              </button>
              
              <div className="text-right">
                <div className="text-sm text-gray-600">Select a table above to continue</div>
                <div className="text-xs text-gray-500">AI will analyze and suggest optimal mappings</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}