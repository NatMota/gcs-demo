import React from 'react';
import { 
  Eye, ArrowRight, Check, PlayCircle, Database,
  FileCode, Calendar, Hash, Shield, Sparkles
} from 'lucide-react';

interface Step4ReviewProps {
  selectedTable: any;
  columnMappings: any;
  mappingConfidence: any;
  intelligenceMode: boolean;
  setCurrentStep: (step: number) => void;
  setMaxStepReached: (step: number) => void;
  setIsProcessing: (processing: boolean) => void;
  maxStepReached: number;
}

export default function Step4Review({
  selectedTable,
  columnMappings,
  mappingConfidence,
  intelligenceMode,
  setCurrentStep,
  setMaxStepReached,
  setIsProcessing,
  maxStepReached
}: Step4ReviewProps) {
  const handleStartImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(6);
      setMaxStepReached(Math.max(maxStepReached, 6));
    }, 3000);
  };

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Import</h2>
          <p className="text-gray-600">Review your configuration and start the data import process</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Database className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Configuration Summary</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700">Selected Table</div>
                  <div className="text-lg font-semibold text-gray-900">{selectedTable?.name}</div>
                  <div className="text-sm text-gray-600">{selectedTable?.path}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Data Format</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <FileCode className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">{selectedTable?.dataFormat}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Files</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Hash className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">{selectedTable?.fileCount}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Partitioned</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-900">
                        {selectedTable?.isPartitioned ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Est. Size</div>
                    <div className="text-sm text-gray-900">{selectedTable?.estimatedSize}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Field Mappings</div>
                  <div className="text-sm text-gray-600">
                    {Object.values(columnMappings).filter(v => v).length} of {selectedTable?.sampleColumns?.length || 0} columns mapped
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Estimates */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">Import Estimates</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-blue-700">Estimated Time</div>
                  <div className="font-semibold text-blue-900">{selectedTable?.estimatedTime || 3} minutes</div>
                </div>
                <div>
                  <div className="text-blue-700">Records</div>
                  <div className="font-semibold text-blue-900">{selectedTable?.totalRecords?.toLocaleString() || '0'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">Validation Results</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Schema Validation</span>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Passed</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Required Fields</span>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Complete</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Data Format</span>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Compatible</span>
                </div>

                {intelligenceMode && (
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">AI Confidence</span>
                    </div>
                    <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                      {Math.round(
                        (Object.values(mappingConfidence) as number[]).reduce((a: number, b: number) => a + b, 0) / 
                        Object.keys(mappingConfidence).length
                      ) || 0}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sample Data Preview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-5 w-5 text-gray-600" />
                <span className="text-lg font-semibold text-gray-900">Sample Data Preview</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedTable?.sampleData?.slice(0, 2).map((row: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      {Object.entries(row).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">{key}:</span>
                          <span className="text-gray-900 font-mono text-xs truncate ml-2">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleStartImport}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 text-sm font-medium"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Start Import</span>
              </button>
              
              <button
                onClick={() => setCurrentStep(4)}
                className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center justify-center space-x-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Back to Mapping</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}