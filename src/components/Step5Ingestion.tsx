import React from 'react';
import { 
  TrendingUp, CheckCircle, ArrowRight, Loader2,
  BarChart3, Clock, Database, PlayCircle
} from 'lucide-react';

interface Step5IngestionProps {
  selectedTable: any;
  columnMappings: any;
  ingestionStarted: boolean;
  setIngestionStarted: (started: boolean) => void;
  setCurrentStep: (step: number) => void;
  setMaxStepReached: (step: number) => void;
  setIsProcessing: (processing: boolean) => void;
  maxStepReached: number;
}

export default function Step5Ingestion({
  selectedTable,
  columnMappings,
  ingestionStarted,
  setIngestionStarted,
  setCurrentStep,
  setMaxStepReached,
  setIsProcessing,
  maxStepReached
}: Step5IngestionProps) {
  const handleStartIngestion = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIngestionStarted(true);
      setCurrentStep(7);
      setMaxStepReached(Math.max(maxStepReached, 7));
    }, 3000);
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {!ingestionStarted ? (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Data Ingestion</h2>
              <p className="text-gray-600 mb-8">
                Your configuration is complete and validated. Click below to begin importing your data into Permutive.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{selectedTable?.estimatedSize}</div>
                    <div className="text-sm text-blue-700">Data Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {selectedTable?.estimatedTime || 3}min
                    </div>
                    <div className="text-sm text-green-700">Est. Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {Object.values(columnMappings).filter(v => v).length}
                    </div>
                    <div className="text-sm text-purple-700">Fields</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleStartIngestion}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 mx-auto text-lg font-semibold"
                >
                  <PlayCircle className="h-6 w-6" />
                  <span>Start Data Ingestion</span>
                </button>
                
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center space-x-2 mx-auto"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  <span>Back to Review</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingesting Data...</h2>
              <p className="text-gray-600 mb-8">
                Your data is being processed and imported into Permutive. This may take a few minutes.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">Processing...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{width: '45%'}}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Processing Records</div>
                  <div className="text-gray-600">Analyzing data structure</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Database className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Mapping Fields</div>
                  <div className="text-gray-600">Applying transformations</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}