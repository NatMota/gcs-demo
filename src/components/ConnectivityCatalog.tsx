import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ChevronRight, ExternalLink,
  Cloud, Database, FileText, Server, Brain, Sparkles,
  CheckCircle, Clock, AlertCircle, ArrowRight, Wand2
} from 'lucide-react';

interface ConnectivityCatalogProps {
  onConnectorSelect: (connector: string) => void;
}

interface Connector {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  iconBg: string;
  status: 'available' | 'coming-soon' | 'beta' | 'new';
  provider: string;
  setupTime?: string;
}

export default function ConnectivityCatalog({ onConnectorSelect }: ConnectivityCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const connectors: Connector[] = [
    {
      id: 'ai-wizard',
      name: 'AI Wizard Connector',
      category: 'intelligent',
      description: 'Let AI automatically configure and optimize your data connections',
      icon: Wand2,
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      status: 'new',
      provider: 'Permutive AI',
      setupTime: '< 2 mins'
    },
    {
      id: 'gcs',
      name: 'Google Cloud Storage',
      category: 'cloud-storage',
      description: 'Connect to data stored in Google Cloud Storage buckets',
      icon: Cloud,
      iconBg: 'bg-blue-500',
      status: 'available',
      provider: 'Google Cloud',
      setupTime: '5-10 mins'
    },
    {
      id: 's3',
      name: 'Amazon S3',
      category: 'cloud-storage',
      description: 'Import data from Amazon S3 buckets',
      icon: Server,
      iconBg: 'bg-orange-500',
      status: 'available',
      provider: 'AWS',
      setupTime: '5-10 mins'
    },
    {
      id: 'bigquery',
      name: 'Google BigQuery',
      category: 'data-warehouse',
      description: 'Connect to BigQuery datasets and tables',
      icon: Database,
      iconBg: 'bg-blue-600',
      status: 'available',
      provider: 'Google Cloud',
      setupTime: '5-10 mins'
    },
    {
      id: 'snowflake',
      name: 'Snowflake',
      category: 'data-warehouse',
      description: 'Import data from Snowflake data warehouse',
      icon: Database,
      iconBg: 'bg-cyan-500',
      status: 'available',
      provider: 'Snowflake',
      setupTime: '10-15 mins'
    },
    {
      id: 'databricks',
      name: 'Databricks',
      category: 'data-platform',
      description: 'Connect to Databricks lakehouse platform',
      icon: Database,
      iconBg: 'bg-red-500',
      status: 'available',
      provider: 'Databricks',
      setupTime: '10-15 mins'
    },
    {
      id: 'redshift',
      name: 'Amazon Redshift',
      category: 'data-warehouse',
      description: 'Import from Redshift data warehouse',
      icon: Database,
      iconBg: 'bg-orange-600',
      status: 'available',
      provider: 'AWS',
      setupTime: '10-15 mins'
    },
    {
      id: 'azure-blob',
      name: 'Azure Blob Storage',
      category: 'cloud-storage',
      description: 'Connect to Azure Blob Storage containers',
      icon: Cloud,
      iconBg: 'bg-blue-400',
      status: 'available',
      provider: 'Microsoft Azure',
      setupTime: '5-10 mins'
    },
    {
      id: 'sftp',
      name: 'SFTP',
      category: 'file-transfer',
      description: 'Import files via secure FTP',
      icon: FileText,
      iconBg: 'bg-gray-600',
      status: 'available',
      provider: 'Generic',
      setupTime: '5-10 mins'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Connectors' },
    { id: 'intelligent', label: 'AI Powered' },
    { id: 'cloud-storage', label: 'Cloud Storage' },
    { id: 'data-warehouse', label: 'Data Warehouse' },
    { id: 'data-platform', label: 'Data Platform' },
    { id: 'file-transfer', label: 'File Transfer' }
  ];

  const filteredConnectors = connectors.filter(connector => {
    const matchesSearch = connector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          connector.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || connector.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Connectivity Catalog</h1>
            <p className="text-gray-600 mt-1">Choose a data source to connect</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Request Connector</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search connectors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="outline-none text-sm"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AI Wizard Banner - Always show at top if not filtered out */}
      {filteredConnectors.find(c => c.id === 'ai-wizard') && (
        <div className="mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                    <Wand2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h2 className="text-xl font-bold">AI Wizard Connector</h2>
                      <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">NEW</span>
                      <Sparkles className="h-5 w-5 text-yellow-300" />
                    </div>
                    <p className="text-white/90">
                      Let AI automatically detect, configure, and optimize your data connections in seconds
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onConnectorSelect('ai-wizard')}
                  className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 flex items-center space-x-2"
                >
                  <span>Try AI Wizard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnectors.filter(c => c.id !== 'ai-wizard').map(connector => (
          <div 
            key={connector.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onConnectorSelect(connector.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${connector.iconBg} rounded-lg flex items-center justify-center text-white`}>
                  <connector.icon className="h-6 w-6" />
                </div>
                {connector.status === 'beta' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">BETA</span>
                )}
                {connector.status === 'coming-soon' && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">SOON</span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{connector.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{connector.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{connector.provider}</span>
                {connector.setupTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{connector.setupTime}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-gray-600">Ready to connect</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredConnectors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No connectors found matching your criteria</p>
        </div>
      )}
    </div>
  );
}