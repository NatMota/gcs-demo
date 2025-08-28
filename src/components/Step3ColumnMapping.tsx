import React from 'react';
import { 
  Brain, ArrowRight, Shield, Check, Eye, 
  User, Calendar, Hash, Tag, Clock, MapPin, Link,
  AlertTriangle, Info, ChevronRight, Sparkles
} from 'lucide-react';

interface Step3ColumnMappingProps {
  selectedTable: any;
  columnMappings: any;
  setColumnMappings: (mappings: any) => void;
  mappingConfidence: any;
  intelligenceMode: boolean;
  permutiveFields: any[];
  setCurrentStep: (step: number) => void;
  setMaxStepReached: (step: number) => void;
  maxStepReached: number;
}

export default function Step3ColumnMapping({
  selectedTable,
  columnMappings,
  setColumnMappings,
  mappingConfidence,
  intelligenceMode,
  permutiveFields,
  setCurrentStep,
  setMaxStepReached,
  maxStepReached
}: Step3ColumnMappingProps) {
  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Map Your Columns</h2>
          <p className="text-gray-600">AI has suggested mappings for <strong>{selectedTable?.name}</strong>. Review and adjust as needed.</p>
        </div>

        {/* AI Intelligence Notice */}
        {intelligenceMode && (
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-purple-900 mb-1">Intelligent Mapping Active</h3>
                <p className="text-sm text-purple-700">
                  AI has analyzed your column names and data types to suggest optimal Permutive field mappings. 
                  Confidence scores are shown for each suggestion.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column Mappings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Hash className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Standard Fields
                </span>
              </div>

              <div className="space-y-3">
                {selectedTable?.sampleColumns?.map((column: any, index: number) => {
                  const mappedField = columnMappings[column.name];
                  const permutiveField = permutiveFields.find(f => f.field === mappedField);
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {mappedField || column.name}
                          </div>
                          {mappedField && permutiveField && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {permutiveField.description}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {mappedField && (
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                          )}
                          {mappedField && (
                            <span className="text-xs font-medium text-purple-700">
                              {column.name}
                            </span>
                          )}
                          {permutiveField?.required && (
                            <span className="text-xs text-red-600 font-medium">(Required)</span>
                          )}
                          {intelligenceMode && mappingConfidence[column.name] && (
                            <div className={`w-2 h-2 rounded-full ${
                              mappingConfidence[column.name] > 80 ? 'bg-green-500' :
                              mappingConfidence[column.name] > 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                          )}
                        </div>
                      </div>
                      
                      <select
                        value={columnMappings[column.name] || ''}
                        onChange={(e) => setColumnMappings({
                          ...columnMappings,
                          [column.name]: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      >
                        <option value="">Select mapping...</option>
                        <optgroup label="Required">
                          {permutiveFields.filter(f => f.required).map(field => (
                            <option key={field.field} value={field.field}>
                              {field.field} - {field.description}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Optional">
                          {permutiveFields.filter(f => !f.required).map(field => (
                            <option key={field.field} value={field.field}>
                              {field.field} - {field.description}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mapping Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Mapping Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total columns:</span>
                  <span className="font-medium">{selectedTable?.sampleColumns?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mapped fields:</span>
                  <span className="font-medium text-green-600">
                    {Object.values(columnMappings).filter(v => v).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Required fields mapped:</span>
                  <span className="font-medium">
                    {Object.values(columnMappings).filter(v => 
                      permutiveFields.find(f => f.field === v && f.required)
                    ).length} / {permutiveFields.filter(f => f.required).length}
                  </span>
                </div>
                {intelligenceMode && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg confidence:</span>
                    <span className="font-medium text-purple-600">
                      {Math.round(
                        (Object.values(mappingConfidence) as number[]).reduce((a: number, b: number) => a + b, 0) / 
                        Object.keys(mappingConfidence).length
                      ) || 0}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Data Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">Preview Data</span>
              </div>
              
              <div className="space-y-3">
                <div className="text-xs font-medium text-gray-700">Sample Data Preview</div>
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
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-xs text-green-700">Fields Validated</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-xs text-blue-700">Schema Ready</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-xs text-purple-700">AI Optimized</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  setCurrentStep(5);
                  setMaxStepReached(Math.max(maxStepReached, 5));
                }}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 font-medium"
              >
                <Check className="h-5 w-5" />
                <span>Continue to Review</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center justify-center space-x-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Back to Table Selection</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}