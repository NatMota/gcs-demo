'use client';

import { useState, useEffect } from 'react';
import { 
  Cloud, CheckCircle, AlertCircle, Settings, Database, ArrowRight, 
  Shield, Activity, Brain, Table, Sparkles, FileCode, Check,
  User, Calendar, Hash, Tag, Clock, MapPin, Link, TrendingUp,
  AlertTriangle, Info, ChevronRight, Loader2, Eye, Download,
  ThumbsUp, RefreshCw, Zap, BarChart3, Users
} from 'lucide-react';

// Mock BigQuery tables data
const mockBigQueryTables = [
  {
    name: 'audience_events',
    dataset: 'analytics_360',
    rowCount: '15.2M',
    lastModified: '2024-01-28',
    columns: [
      { name: 'user_id', type: 'STRING', sample: 'usr_abc123xyz' },
      { name: 'timestamp', type: 'TIMESTAMP', sample: '2024-01-28 10:30:00' },
      { name: 'event_type', type: 'STRING', sample: 'page_view' },
      { name: 'page_url', type: 'STRING', sample: 'https://example.com/article' },
      { name: 'session_id', type: 'STRING', sample: 'sess_789def456' },
      { name: 'device_type', type: 'STRING', sample: 'mobile' },
      { name: 'geo_country', type: 'STRING', sample: 'United States' },
      { name: 'content_category', type: 'STRING', sample: 'sports' },
      { name: 'referrer_source', type: 'STRING', sample: 'google' }
    ]
  },
  {
    name: 'user_segments',
    dataset: 'cdp_exports',
    rowCount: '2.8M',
    lastModified: '2024-01-27',
    columns: [
      { name: 'customer_id', type: 'STRING', sample: 'cust_xyz789' },
      { name: 'segment_codes', type: 'STRING', sample: 'SEG001,SEG015,SEG042' },
      { name: 'last_updated', type: 'TIMESTAMP', sample: '2024-01-27 18:00:00' },
      { name: 'interest_categories', type: 'STRING', sample: 'sports,tech,finance' },
      { name: 'lifetime_value', type: 'FLOAT', sample: '458.32' }
    ]
  },
  {
    name: 'content_interactions',
    dataset: 'web_analytics',
    rowCount: '8.5M',
    lastModified: '2024-01-28',
    columns: [
      { name: 'visitor_id', type: 'STRING', sample: 'vid_456abc789' },
      { name: 'article_id', type: 'STRING', sample: 'art_12345' },
      { name: 'interaction_time', type: 'TIMESTAMP', sample: '2024-01-28 09:15:00' },
      { name: 'scroll_depth', type: 'INTEGER', sample: '85' },
      { name: 'time_on_page', type: 'INTEGER', sample: '245' }
    ]
  }
];

// Permutive standard fields
const permutiveFields = [
  { field: 'user_id', required: true, description: 'Unique identifier for users', icon: User },
  { field: 'timestamp', required: true, description: 'Event timestamp', icon: Calendar },
  { field: 'event_type', required: true, description: 'Type of event or action', icon: Tag },
  { field: 'segment_codes', required: false, description: 'Comma-separated segment codes', icon: Hash },
  { field: 'url', required: false, description: 'Page or content URL', icon: Link },
  { field: 'geo_info', required: false, description: 'Geographic information', icon: MapPin },
  { field: 'device_info', required: false, description: 'Device and browser details', icon: Database },
  { field: 'custom_properties', required: false, description: 'Additional properties', icon: Settings }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [columnMappings, setColumnMappings] = useState<any>({});
  const [validationStatus, setValidationStatus] = useState<any>({});
  const [mcpSuggestions, setMcpSuggestions] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [ingestionStarted, setIngestionStarted] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);

  // Simulate OAuth login
  const handleGoogleLogin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsProcessing(false);
      setCurrentStep(2);
    }, 2000);
  };

  // Simulate table selection and MCP analysis
  const handleTableSelect = (table: any) => {
    setSelectedTable(table);
    setIsProcessing(true);
    
    // Simulate MCP analyzing columns
    setTimeout(() => {
      const suggestions = analyzeMappings(table);
      setMcpSuggestions(suggestions);
      setColumnMappings(suggestions);
      setIsProcessing(false);
      setCurrentStep(3);
    }, 1500);
  };

  // MCP column mapping intelligence
  const analyzeMappings = (table: any) => {
    const mappings: any = {};
    const patterns = {
      user_id: /user.*id|customer.*id|visitor.*id|uid|userid/i,
      timestamp: /time|timestamp|date|created|updated/i,
      event_type: /event.*type|action|type|category/i,
      segment_codes: /segment|codes|tags|interests/i,
      url: /url|uri|path|page/i,
      geo_info: /geo|country|location|region|city/i,
      device_info: /device|browser|platform|os/i
    };

    table.columns.forEach((column: any) => {
      Object.keys(patterns).forEach((permutiveField: any) => {
        if ((patterns as any)[permutiveField].test(column.name) && !mappings[permutiveField]) {
          mappings[permutiveField] = column.name;
        }
      });
    });

    // Calculate confidence score
    const requiredFields = ['user_id', 'timestamp', 'event_type'];
    const mappedRequired = requiredFields.filter(field => mappings[field]).length;
    const confidence = Math.round((mappedRequired / requiredFields.length) * 100);
    setConfidenceScore(confidence);

    return mappings;
  };

  // Validate mappings
  const validateMappings = () => {
    setIsProcessing(true);
    const status: any = {};
    
    // Check required fields
    ['user_id', 'timestamp', 'event_type'].forEach(field => {
      status[field] = columnMappings[field] ? 'valid' : 'missing';
    });

    // Check optional fields
    Object.keys(columnMappings).forEach(field => {
      if (!status[field]) {
        status[field] = 'valid';
      }
    });

    setTimeout(() => {
      setValidationStatus(status);
      setIsProcessing(false);
      setCurrentStep(4);
    }, 1000);
  };

  // Generate configuration
  const generateConfig = () => {
    const config = {
      source: {
        project: 'your-gcp-project',
        dataset: selectedTable?.dataset,
        table: selectedTable?.name
      },
      destination: 'permutive_audience_platform',
      mappings: columnMappings,
      schedule: 'daily',
      validation: validationStatus,
      confidence_score: confidenceScore,
      created_at: new Date().toISOString()
    };
    return JSON.stringify(config, null, 2);
  };

  // Start ingestion
  const startIngestion = () => {
    setIngestionStarted(true);
    setCurrentStep(5);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-permutive-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-permutive-blue" />
                <span className="text-xl font-semibold text-permutive-gray-900">Permutive MCP</span>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                AI-Powered
              </span>
            </div>
            <nav className="flex items-center space-x-6">
              <span className="flex items-center text-sm text-permutive-gray-600">
                <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
                Intelligent Column Mapping
              </span>
              <button className="text-permutive-gray-600 hover:text-permutive-blue">
                <Settings className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-permutive-gray-50 border-b border-permutive-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Authenticate', icon: Shield },
              { num: 2, label: 'Select Data', icon: Database },
              { num: 3, label: 'Map Columns', icon: Brain },
              { num: 4, label: 'Validate', icon: CheckCircle },
              { num: 5, label: 'Ingest', icon: TrendingUp }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className={`flex items-center ${currentStep >= step.num ? 'text-permutive-blue' : 'text-permutive-gray-400'}`}>
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${currentStep >= step.num ? 'border-permutive-blue bg-permutive-blue text-white' : 'border-permutive-gray-300 bg-white'}
                  `}>
                    {currentStep > step.num ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 font-medium ${currentStep >= step.num ? 'text-permutive-gray-900' : 'text-permutive-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
                {idx < 4 && (
                  <ChevronRight className={`mx-4 h-5 w-5 ${currentStep > step.num ? 'text-permutive-blue' : 'text-permutive-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Authentication */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-permutive-gray-200 p-8">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-permutive-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-permutive-gray-900 mb-2">
                  Connect to Google Cloud
                </h2>
                <p className="text-permutive-gray-600">
                  Authenticate with your Google account to access BigQuery tables
                </p>
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={isProcessing}
                className="w-full flex items-center justify-center px-6 py-3 bg-white border border-permutive-gray-300 rounded-lg hover:bg-permutive-gray-50 transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </>
                )}
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Required Permissions:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1">
                      <li>BigQuery Data Viewer</li>
                      <li>BigQuery Job User</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Table Selection */}
        {currentStep === 2 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-permutive-gray-900 mb-2">
                Select BigQuery Table
              </h2>
              <p className="text-permutive-gray-600">
                Choose the table containing your audience data for ingestion into Permutive
              </p>
            </div>

            <div className="grid gap-4">
              {mockBigQueryTables.map((table) => (
                <button
                  key={table.name}
                  onClick={() => handleTableSelect(table)}
                  className="bg-white rounded-lg shadow-sm border border-permutive-gray-200 p-6 hover:border-permutive-blue transition-colors text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Table className="h-5 w-5 text-permutive-blue mr-2" />
                        <h3 className="text-lg font-semibold text-permutive-gray-900">
                          {table.dataset}.{table.name}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-permutive-gray-600">
                        <span className="flex items-center">
                          <Database className="h-4 w-4 mr-1" />
                          {table.rowCount} rows
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Updated {table.lastModified}
                        </span>
                        <span className="flex items-center">
                          <Hash className="h-4 w-4 mr-1" />
                          {table.columns.length} columns
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {table.columns.slice(0, 5).map((col) => (
                          <span key={col.name} className="px-2 py-1 bg-permutive-gray-100 text-xs rounded">
                            {col.name}
                          </span>
                        ))}
                        {table.columns.length > 5 && (
                          <span className="px-2 py-1 bg-permutive-gray-100 text-xs rounded text-permutive-gray-500">
                            +{table.columns.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-permutive-gray-400 ml-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Column Mapping with MCP Intelligence */}
        {currentStep === 3 && selectedTable && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-permutive-gray-900">
                  Intelligent Column Mapping
                </h2>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-permutive-gray-700">
                    MCP Confidence: {confidenceScore}%
                  </span>
                </div>
              </div>
              <p className="text-permutive-gray-600">
                MCP has analyzed your table structure and suggested mappings to Permutive fields
              </p>
            </div>

            {/* MCP Analysis Card */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6 border border-purple-200">
              <div className="flex items-start">
                <Brain className="h-6 w-6 text-purple-600 mt-1 mr-3" />
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-2">MCP Analysis Complete</h3>
                  <p className="text-sm text-purple-700 mb-3">
                    Based on column naming patterns and data types, we've automatically mapped {Object.keys(mcpSuggestions).length} fields.
                    Please review and adjust as needed.
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-purple-600">
                      ✓ {Object.keys(mcpSuggestions).filter(k => ['user_id', 'timestamp', 'event_type'].includes(k)).length}/3 required fields mapped
                    </span>
                    <span className="text-sm text-purple-600">
                      ✓ Pattern matching applied
                    </span>
                    <span className="text-sm text-purple-600">
                      ✓ Similar to 89% of publisher configs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapping Interface */}
            <div className="bg-white rounded-lg shadow-sm border border-permutive-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {permutiveFields.map((field) => {
                    const Icon = field.icon;
                    const isMapped = columnMappings[field.field];
                    const isRequired = field.required;

                    return (
                      <div key={field.field} className="flex items-center space-x-4 p-4 rounded-lg bg-permutive-gray-50">
                        <Icon className={`h-5 w-5 ${isMapped ? 'text-permutive-blue' : 'text-permutive-gray-400'}`} />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-permutive-gray-900">
                              {field.field}
                            </span>
                            {isRequired && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                                Required
                              </span>
                            )}
                            {isMapped && mcpSuggestions[field.field] && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded flex items-center">
                                <Sparkles className="h-3 w-3 mr-1" />
                                MCP Suggested
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-permutive-gray-600">{field.description}</p>
                        </div>

                        <select
                          value={columnMappings[field.field] || ''}
                          onChange={(e) => setColumnMappings({...columnMappings, [field.field]: e.target.value})}
                          className="w-64 px-3 py-2 border border-permutive-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-permutive-blue"
                        >
                          <option value="">-- Not mapped --</option>
                          {selectedTable.columns.map((col: any) => (
                            <option key={col.name} value={col.name}>
                              {col.name} ({col.type})
                            </option>
                          ))}
                        </select>

                        {isMapped && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 text-permutive-gray-700 hover:text-permutive-gray-900"
                  >
                    ← Back to Tables
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setColumnMappings(mcpSuggestions);
                      }}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 flex items-center"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset to MCP Suggestions
                    </button>
                    <button
                      onClick={validateMappings}
                      disabled={isProcessing}
                      className="btn-primary flex items-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Validating...
                        </>
                      ) : (
                        <>
                          Validate Mappings
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Validation & Configuration */}
        {currentStep === 4 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-permutive-gray-900 mb-2">
                Validation & Configuration
              </h2>
              <p className="text-permutive-gray-600">
                Review the mapping validation and configuration before starting ingestion
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Validation Results */}
              <div className="bg-white rounded-lg shadow-sm border border-permutive-gray-200 p-6">
                <h3 className="font-semibold text-permutive-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Validation Results
                </h3>
                
                <div className="space-y-3">
                  {Object.entries(validationStatus).map(([field, status]) => (
                    <div key={field} className="flex items-center justify-between p-3 rounded-lg bg-permutive-gray-50">
                      <span className="font-medium text-permutive-gray-700">{field}</span>
                      {status === 'valid' ? (
                        <span className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Valid
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Missing
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Match Score */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Configuration Match Score</span>
                    <span className="text-2xl font-bold text-blue-600">92%</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    This configuration matches patterns from 147 similar publisher integrations
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <div className="flex-1 bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 rounded-full h-2" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Preview */}
              <div className="bg-white rounded-lg shadow-sm border border-permutive-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-permutive-gray-900 flex items-center">
                    <FileCode className="h-5 w-5 text-permutive-gray-600 mr-2" />
                    Configuration File
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowConfig(!showConfig)}
                      className="p-2 hover:bg-permutive-gray-100 rounded"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-permutive-gray-100 rounded">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {showConfig ? (
                  <pre className="bg-permutive-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                    {generateConfig()}
                  </pre>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-permutive-gray-50 rounded-lg">
                      <span className="text-sm text-permutive-gray-600">Source:</span>
                      <p className="font-medium">{selectedTable?.dataset}.{selectedTable?.name}</p>
                    </div>
                    <div className="p-3 bg-permutive-gray-50 rounded-lg">
                      <span className="text-sm text-permutive-gray-600">Destination:</span>
                      <p className="font-medium">Permutive Audience Platform</p>
                    </div>
                    <div className="p-3 bg-permutive-gray-50 rounded-lg">
                      <span className="text-sm text-permutive-gray-600">Schedule:</span>
                      <p className="font-medium">Daily at 02:00 UTC</p>
                    </div>
                    <div className="p-3 bg-permutive-gray-50 rounded-lg">
                      <span className="text-sm text-permutive-gray-600">Mapped Fields:</span>
                      <p className="font-medium">{Object.keys(columnMappings).length} fields</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Historical Performance */}
            <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-start">
                <TrendingUp className="h-6 w-6 text-green-600 mt-1 mr-3" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-2">Expected Performance</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Based on similar configurations from other publishers:
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-green-600">98.5%</p>
                      <p className="text-xs text-green-600">Match Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">2.3M</p>
                      <p className="text-xs text-green-600">Daily Events</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">&lt;5min</p>
                      <p className="text-xs text-green-600">Processing Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 text-permutive-gray-700 hover:text-permutive-gray-900"
              >
                ← Back to Mapping
              </button>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-permutive-gray-100 text-permutive-gray-700 rounded-md hover:bg-permutive-gray-200">
                  Save as Draft
                </button>
                <button
                  onClick={startIngestion}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Approve & Start Ingestion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Ingestion Started */}
        {currentStep === 5 && ingestionStarted && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-permutive-gray-200 p-8">
              <div className="text-center">
                <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-permutive-gray-900 mb-2">
                  Ingestion Started Successfully!
                </h2>
                <p className="text-permutive-gray-600 mb-6">
                  Your BigQuery data is now being ingested into the Permutive Audience Platform
                </p>

                <div className="bg-permutive-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-permutive-gray-600">Status</p>
                      <p className="font-semibold text-green-600 flex items-center">
                        <Activity className="h-4 w-4 mr-1" />
                        Processing
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-permutive-gray-600">Records Processed</p>
                      <p className="font-semibold">0 / {selectedTable?.rowCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-permutive-gray-600">Estimated Time</p>
                      <p className="font-semibold">~15 minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-permutive-gray-600">Next Sync</p>
                      <p className="font-semibold">Daily at 02:00 UTC</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <button className="px-6 py-2 bg-permutive-blue text-white rounded-md hover:bg-permutive-darkblue">
                    View in Dashboard
                  </button>
                  <button className="px-6 py-2 bg-permutive-gray-100 text-permutive-gray-700 rounded-md hover:bg-permutive-gray-200">
                    Configure Alerts
                  </button>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Next Steps</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Monitor ingestion progress in the Permutive Dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Create audience segments once data is available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Set up activation endpoints for your segments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Configure data quality alerts and monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <Loader2 className="animate-spin h-6 w-6 text-permutive-blue" />
            <span className="text-permutive-gray-700">Processing...</span>
          </div>
        </div>
      )}
    </>
  );
}