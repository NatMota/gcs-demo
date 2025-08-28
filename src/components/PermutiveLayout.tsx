import React, { useState } from 'react';
import { 
  Database, Cloud, Settings, Users, BarChart3, 
  FileText, Shield, Activity, ChevronRight, ChevronDown,
  Home, Zap, Search, Bell, HelpCircle, Plus, Grid3X3
} from 'lucide-react';

interface PermutiveLayoutProps {
  children: React.ReactNode;
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function PermutiveLayout({ 
  children, 
  currentSection = 'connectivity',
  onSectionChange 
}: PermutiveLayoutProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['data']);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    );
  };

  const navigation = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/home'
    },
    {
      id: 'data',
      label: 'Data',
      icon: Database,
      expanded: true,
      subItems: [
        { id: 'connectivity', label: 'Connectivity', path: '/connectivity' },
        { id: 'imports', label: 'Imports', path: '/imports' },
        { id: 'exports', label: 'Exports', path: '/exports' },
        { id: 'schemas', label: 'Schemas', path: '/schemas' }
      ]
    },
    {
      id: 'audiences',
      label: 'Audiences',
      icon: Users,
      subItems: [
        { id: 'segments', label: 'Segments', path: '/segments' },
        { id: 'cohorts', label: 'Cohorts', path: '/cohorts' }
      ]
    },
    {
      id: 'activation',
      label: 'Activation',
      icon: Zap,
      subItems: [
        { id: 'destinations', label: 'Destinations', path: '/destinations' },
        { id: 'campaigns', label: 'Campaigns', path: '/campaigns' }
      ]
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: BarChart3,
      subItems: [
        { id: 'analytics', label: 'Analytics', path: '/analytics' },
        { id: 'reports', label: 'Reports', path: '/reports' }
      ]
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: Shield,
      subItems: [
        { id: 'consent', label: 'Consent', path: '/consent' },
        { id: 'compliance', label: 'Compliance', path: '/compliance' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded"></div>
            <span className="text-xl font-semibold text-gray-900">Permutive</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.subItems) {
                      toggleMenu(item.id);
                    } else if (onSectionChange) {
                      onSectionChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentSection === item.id || item.subItems?.some(sub => sub.id === currentSection)
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.subItems && (
                    expandedMenus.includes(item.id)
                      ? <ChevronDown className="h-4 w-4" />
                      : <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {item.subItems && expandedMenus.includes(item.id) && (
                  <ul className="mt-1 ml-7 space-y-1">
                    {item.subItems.map(subItem => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => onSectionChange && onSectionChange(subItem.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            currentSection === subItem.id
                              ? 'bg-purple-100 text-purple-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Data</span>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <span className="text-gray-900 font-medium">Connectivity</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}