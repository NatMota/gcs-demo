'use client';

import React, { useState } from 'react';
import PermutiveLayout from '../components/PermutiveLayout';
import ConnectivityCatalog from '../components/ConnectivityCatalog';
import Step1GCSConfiguration from '../components/Step1GCSConfiguration';
import Step2IAMPermissions from '../components/Step2IAMPermissions';
import Step2TableDiscovery from '../components/Step2TableDiscovery';
import Step3ColumnMapping from '../components/Step3ColumnMapping';
import Step4Review from '../components/Step4Review';
import Step5Ingestion from '../components/Step5Ingestion';
import Step6Complete from '../components/Step6Complete';
import AIWizardFlow from '../components/AIWizardFlow';

export default function PermutivePage() {
  const [currentSection, setCurrentSection] = useState('connectivity');
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  
  // GCS Configuration State
  const [gcsConfig, setGcsConfig] = useState({
    connectionName: '',
    gcpProjectId: '',
    bucketRegion: '',
    bucketName: '',
    schemaPrefix: '',
    dataFormat: 'parquet',
    dataPartitioning: 'all-partitioned',
    serviceAccountKey: ''
  });
  
  const [iamStatus, setIamStatus] = useState<'unchecked' | 'checking' | 'valid' | 'invalid'>('unchecked');
  const [discoveredStructure, setDiscoveredStructure] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [columnMappings, setColumnMappings] = useState<any>({});
  const [mappingConfidence, setMappingConfidence] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [ingestionStarted, setIngestionStarted] = useState(false);
  const [intelligenceMode, setIntelligenceMode] = useState(false);

  // Mock data for demo
  const [gcpAccess] = useState<'none' | 'checking' | 'available'>('available');
  const [gcpProjects] = useState([
    { projectId: 'acme-analytics-prod', name: 'ACME Analytics Production' },
    { projectId: 'acme-marketing-data', name: 'ACME Marketing Data' }
  ]);
  const [gcpBuckets, setGcpBuckets] = useState([
    { name: 'analytics-data-prod', region: 'us-central1' },
    { name: 'marketing-warehouse', region: 'us-east1' }
  ]);
  const [suggestedConfigs] = useState([]);
  const gcsRegions = [
    { id: 'us-central1', name: 'US Central' },
    { id: 'us-east1', name: 'US East' },
    { id: 'europe-west1', name: 'Europe West' }
  ];

  const permutiveFields = [
    { field: 'user_id', description: 'Unique user identifier', required: true },
    { field: 'event_name', description: 'Name of the event', required: true },
    { field: 'timestamp', description: 'Event timestamp', required: true },
    { field: 'properties', description: 'Event properties', required: false }
  ];

  const handleConnectorSelect = (connector: string) => {
    setSelectedConnector(connector);
    if (connector === 'ai-wizard') {
      setWizardStep(0); // Start AI Wizard flow
    } else if (connector === 'gcs') {
      setWizardStep(1); // Start GCS configuration
    }
  };

  const checkIamPermissions = () => {
    setIamStatus('checking');
    setTimeout(() => {
      setIamStatus('valid');
    }, 2000);
  };

  const discoverBucketStructure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setDiscoveredStructure({
        tables: [
          { name: 'user_events', path: 'events/user_events/', fileCount: 342 },
          { name: 'user_profiles', path: 'profiles/user_profiles/', fileCount: 89 }
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  const applySuggestion = (suggestion: any) => {
    // Apply AI suggestion to config
    setGcsConfig({ ...gcsConfig, ...suggestion });
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    if (section === 'connectivity') {
      setSelectedConnector(null);
      setWizardStep(0);
    }
  };

  return (
    <PermutiveLayout currentSection={currentSection} onSectionChange={handleSectionChange}>
      {currentSection === 'connectivity' && !selectedConnector && (
        <ConnectivityCatalog onConnectorSelect={handleConnectorSelect} />
      )}
      
      {selectedConnector === 'ai-wizard' && wizardStep === 0 && (
        <AIWizardFlow 
          onComplete={(config) => {
            setGcsConfig(config);
            setWizardStep(1);
          }}
          onCancel={() => {
            setSelectedConnector(null);
            setWizardStep(0);
          }}
        />
      )}
      
      {(selectedConnector === 'gcs' || (selectedConnector === 'ai-wizard' && wizardStep > 0)) && (
        <div className="h-full">
          {/* Progress Steps Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => {
                  setSelectedConnector(null);
                  setWizardStep(0);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back to Catalog
              </button>
              
              <div className="flex items-center space-x-4">
                {['Configuration', 'IAM', 'Discovery', 'Mapping', 'Review', 'Import'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                      wizardStep === index + 1 
                        ? 'bg-purple-100 text-purple-700' 
                        : wizardStep > index + 1
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                    {index < 5 && <div className="w-8 h-px bg-gray-300 mx-2" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="h-full overflow-auto">
            {wizardStep === 1 && (
              <Step1GCSConfiguration
                gcsConfig={gcsConfig}
                setGcsConfig={setGcsConfig}
                intelligenceMode={intelligenceMode}
                setIntelligenceMode={setIntelligenceMode}
                suggestedConfigs={suggestedConfigs}
                applySuggestion={applySuggestion}
                gcpAccess={gcpAccess}
                gcpProjects={gcpProjects}
                gcpBuckets={gcpBuckets}
                setGcpBuckets={setGcpBuckets}
                gcsRegions={gcsRegions}
                handleGcsConfiguration={() => setWizardStep(2)}
                checkIamPermissions={() => setWizardStep(2)}
              />
            )}
            
            {wizardStep === 2 && (
              <Step2IAMPermissions
                gcsConfig={gcsConfig}
                iamStatus={iamStatus}
                checkIamPermissions={checkIamPermissions}
                setCurrentStep={setWizardStep}
                setMaxStepReached={setMaxStepReached}
                maxStepReached={maxStepReached}
              />
            )}
            
            {wizardStep === 3 && (
              <Step2TableDiscovery
                discoveredStructure={discoveredStructure}
                handleTableSelect={(table: any) => {
                  setSelectedTable(table);
                  setWizardStep(4);
                }}
                discoverBucketStructure={discoverBucketStructure}
                setCurrentStep={setWizardStep}
                setMaxStepReached={setMaxStepReached}
                maxStepReached={maxStepReached}
              />
            )}
            
            {wizardStep === 4 && (
              <Step3ColumnMapping
                selectedTable={selectedTable}
                columnMappings={columnMappings}
                setColumnMappings={setColumnMappings}
                mappingConfidence={mappingConfidence}
                intelligenceMode={intelligenceMode}
                permutiveFields={permutiveFields}
                setCurrentStep={setWizardStep}
                setMaxStepReached={setMaxStepReached}
                maxStepReached={maxStepReached}
              />
            )}
            
            {wizardStep === 5 && (
              <Step4Review
                selectedTable={selectedTable}
                columnMappings={columnMappings}
                mappingConfidence={mappingConfidence}
                intelligenceMode={intelligenceMode}
                setCurrentStep={setWizardStep}
                setMaxStepReached={setMaxStepReached}
                setIsProcessing={setIsProcessing}
                maxStepReached={maxStepReached}
              />
            )}
            
            {wizardStep === 6 && (
              <Step5Ingestion
                selectedTable={selectedTable}
                columnMappings={columnMappings}
                ingestionStarted={ingestionStarted}
                setIngestionStarted={setIngestionStarted}
                setCurrentStep={setWizardStep}
                setMaxStepReached={setMaxStepReached}
                setIsProcessing={setIsProcessing}
                maxStepReached={maxStepReached}
              />
            )}
          </div>
        </div>
      )}
    </PermutiveLayout>
  );
}