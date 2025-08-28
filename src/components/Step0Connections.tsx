import React from 'react';
import { 
  Cloud, CheckCircle, Settings, Database, ArrowRight, 
  Shield, Activity, Brain, Sparkles, FileCode, 
  User, Calendar, Hash, Tag, Clock, MapPin, Link,
  AlertTriangle, Info, ChevronRight, Loader2, Download,
  ThumbsUp, RefreshCw, Zap, BarChart3, Users
} from 'lucide-react';

interface Step0ConnectionsProps {
  wizardSubStep: number;
  setWizardSubStep: (step: number) => void;
  intelligenceMode: boolean;
  setIntelligenceMode: (mode: boolean) => void;
  suggestedConfigs: any[];
  applySuggestion: (suggestion: any) => void;
  gcpAccess: 'none' | 'checking' | 'available';
}

export default function Step0Connections({
  wizardSubStep,
  setWizardSubStep,
  intelligenceMode,
  setIntelligenceMode,
  suggestedConfigs,
  applySuggestion,
  gcpAccess
}: Step0ConnectionsProps) {
  return (
    <div className="h-full bg-gray-50">
      {wizardSubStep === 1 && (
        <div className="h-full">
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Data Connections</h1>
                  <p className="text-gray-600 mt-1">Connect your data sources to Permutive</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">7 Active</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">2 Configuring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Enhanced AI Setup Wizard Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden relative group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-yellow-300" />
                        <span className="text-xs font-semibold text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded-full">
                          AI-Powered
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <h3 className="text-xl font-bold text-white">Intelligent GCS Setup</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        Let AI analyze your Google Cloud Storage and automatically configure optimal data connections with smart field mapping.
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-300" />
                        <span className="text-sm text-blue-100">Auto-detects bucket structure</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-300" />
                        <span className="text-sm text-blue-100">Intelligent column mapping</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-300" />
                        <span className="text-sm text-blue-100">Optimized performance settings</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setWizardSubStep(2)}
                      className="w-full bg-white text-purple-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 group"
                    >
                      <Brain className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      <span>Start AI Setup</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* AI Intelligence Toggle */}
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-blue-100">
                          Enhanced Intelligence
                        </label>
                        <button
                          onClick={() => setIntelligenceMode(!intelligenceMode)}
                          className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
                            intelligenceMode ? 'bg-green-400' : 'bg-white/20'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform mt-1 ${
                              intelligenceMode ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-xs text-blue-200 mt-1">
                        {intelligenceMode ? 'Advanced AI suggestions enabled' : 'Standard setup mode'}
                      </p>
                    </div>
                  </div>

                  {/* Smart Suggestions Preview */}
                  {intelligenceMode && gcpAccess === 'available' && suggestedConfigs.length > 0 && (
                    <div className="border-t border-white/20 p-4 bg-black/10">
                      <div className="flex items-center space-x-2 mb-3">
                        <Zap className="h-4 w-4 text-yellow-300" />
                        <span className="text-sm font-medium text-white">Smart Suggestions Ready</span>
                      </div>
                      <div className="space-y-2">
                        {suggestedConfigs.slice(0, 2).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => applySuggestion(suggestion)}
                            className="w-full text-left p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
                          >
                            <div className="text-xs font-medium text-white">{suggestion.connectionSuggestion}</div>
                            <div className="text-xs text-blue-200">{suggestion.name} • {suggestion.projectId}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Statistics Cards */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">847M</div>
                        <div className="text-xs text-gray-500">Events/Month</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900">Data Volume</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <div className="text-xs text-gray-600">78% of monthly quota</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">12.4M</div>
                        <div className="text-xs text-gray-500">Active Users</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900">Audience Growth</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">+14.2% MTD</span>
                        </div>
                        <ThumbsUp className="h-3 w-3 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Options Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Cloud className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-xs text-green-600 font-medium">Ready</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Google Cloud Storage</h4>
                  <p className="text-xs text-gray-500">Connect your GCS buckets</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer opacity-60">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Database className="h-6 w-6 text-orange-500" />
                    </div>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <h4 className="font-medium text-gray-500 mb-1">BigQuery</h4>
                  <p className="text-xs text-gray-400">Direct warehouse connection</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer opacity-60">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-red-500" />
                    </div>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <h4 className="font-medium text-gray-500 mb-1">Snowflake</h4>
                  <p className="text-xs text-gray-400">Enterprise data warehouse</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer opacity-60">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Activity className="h-6 w-6 text-purple-500" />
                    </div>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <h4 className="font-medium text-gray-500 mb-1">Databricks</h4>
                  <p className="text-xs text-gray-400">Unified analytics platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Catalogs View */}
      {wizardSubStep === 2 && (
        <div className="h-full bg-gray-50">
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setWizardSubStep(1)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    <span>Back to Connections</span>
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Available Data Catalogs</h1>
                  <p className="text-gray-600 mt-1">Choose your data source to begin intelligent setup</p>
                </div>
                <div className="w-32"></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Google Cloud Storage - Enhanced */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Cloud className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Google Cloud Storage
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Connect to your GCS buckets with intelligent schema detection and automated field mapping.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Auto-discovery enabled</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Smart mapping available</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Ready to Configure</span>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* BigQuery - Coming Soon */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 opacity-60">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <Database className="h-8 w-8 text-orange-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-500">Google BigQuery</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Direct connection to your BigQuery datasets with real-time querying capabilities.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Real-time queries</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Native SQL support</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Snowflake - Coming Soon */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 opacity-60">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <Shield className="h-8 w-8 text-indigo-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-500">Snowflake</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Enterprise-grade data warehouse integration with advanced security features.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Enterprise security</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">Scalable performance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Sparkles className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Ready to Get Started?</h3>
                      <p className="text-sm text-gray-600">
                        Select Google Cloud Storage above to begin your intelligent data connection setup.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Estimated Setup Time</div>
                      <div className="text-lg font-bold text-blue-600">3-5 minutes</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}