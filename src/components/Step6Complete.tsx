import React from 'react';
import { 
  TrendingUp, CheckCircle, ArrowRight, 
  BarChart3, Users, Database
} from 'lucide-react';

interface Step6CompleteProps {
  selectedTable: any;
  columnMappings: any;
  setCurrentStep: (step: number) => void;
  setWizardSubStep: (step: number) => void;
  setSelectedTable: (table: any) => void;
  setSelectedDataSource: (source: any) => void;
  setIsAuthenticated: (auth: boolean) => void;
}

export default function Step6Complete({
  selectedTable,
  columnMappings,
  setCurrentStep,
  setWizardSubStep,
  setSelectedTable,
  setSelectedDataSource,
  setIsAuthenticated
}: Step6CompleteProps) {
  const handleCreateAnother = () => {
    setCurrentStep(0);
    setWizardSubStep(1);
    setSelectedTable(null);
    setSelectedDataSource(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Ingestion Started</h2>
          <p className="text-gray-600 mb-8">
            Your data is now being imported into the Permutive platform
          </p>
          
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 text-green-700 mb-4">
              <CheckCircle className="h-6 w-6" />
              <span className="font-semibold text-lg">Integration Complete!</span>
            </div>
            <p className="text-green-600">
              Your {selectedTable?.name} table is now connected and data is flowing into Permutive.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">2.3GB</div>
              <div className="text-sm text-gray-600">Data Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">Active</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Object.values(columnMappings).filter(v => v).length}
              </div>
              <div className="text-sm text-gray-600">Fields Mapped</div>
            </div>
          </div>
          
          <button
            onClick={handleCreateAnother}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Another Connection
          </button>
        </div>
      </div>
    </div>
  );
}