import React, { useState, useEffect } from 'react';
import { 
  Shield, Check, X, Loader2, AlertCircle, 
  ArrowRight, Info, Copy, ChevronRight
} from 'lucide-react';

interface Step2IAMPermissionsProps {
  gcsConfig: any;
  iamStatus: 'unchecked' | 'checking' | 'valid' | 'invalid';
  checkIamPermissions: () => void;
  setCurrentStep: (step: number) => void;
  setMaxStepReached: (step: number) => void;
  maxStepReached: number;
}

export default function Step2IAMPermissions({
  gcsConfig,
  iamStatus,
  checkIamPermissions,
  setCurrentStep,
  setMaxStepReached,
  maxStepReached
}: Step2IAMPermissionsProps) {
  const [copied, setCopied] = useState(false);

  const serviceAccount = 'connection@permutive.iam.gserviceaccount.com';
  const requiredRoles = [
    { role: 'roles/storage.objectViewer', description: 'Read access to objects in your bucket' },
    { role: 'roles/storage.bucketViewer', description: 'View bucket metadata and list objects' }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Auto-check permissions when component mounts
    if (iamStatus === 'unchecked') {
      setTimeout(() => checkIamPermissions(), 500);
    }
  }, []);

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure IAM Permissions</h2>
          <p className="text-gray-600">Grant Permutive read access to your GCS bucket</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Service Account Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Account</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Add this service account to your bucket:</p>
                  <code className="text-sm font-mono text-blue-600">{serviceAccount}</code>
                </div>
                <button
                  onClick={() => handleCopy(serviceAccount)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Required Roles Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required IAM Roles</h3>
            <div className="space-y-3">
              {requiredRoles.map((role, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded ${
                      iamStatus === 'valid' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {iamStatus === 'valid' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : iamStatus === 'invalid' ? (
                        <X className="h-4 w-4 text-red-600" />
                      ) : (
                        <Shield className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <code className="text-sm font-mono text-purple-600">{role.role}</code>
                      <p className="text-xs text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bucket Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bucket Configuration</h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bucket:</span>
                  <code className="font-mono text-blue-600">gs://{gcsConfig.bucketName || 'your-bucket-name'}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Schema Prefix:</span>
                  <code className="font-mono text-blue-600">{gcsConfig.schemaPrefix || 'schema/prefix'}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Region:</span>
                  <span className="font-medium text-gray-900">{gcsConfig.bucketRegion || 'us-central1'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Permission Status */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Status</h3>
            
            {iamStatus === 'checking' && (
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-blue-700 font-medium">Verifying IAM permissions...</p>
                <p className="text-sm text-blue-600 mt-2">This may take a few moments</p>
              </div>
            )}

            {iamStatus === 'valid' && (
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Permissions Verified!</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Permutive has read access to your GCS bucket
                    </p>
                  </div>
                </div>
              </div>
            )}

            {iamStatus === 'invalid' && (
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 rounded-full p-2">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900">Permission Check Failed</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Please ensure the service account has the required roles
                    </p>
                    <div className="mt-3 bg-white rounded p-3 border border-red-200">
                      <p className="text-xs text-gray-600 mb-2">Run this command in Cloud Shell:</p>
                      <code className="text-xs font-mono text-gray-800">
                        gsutil iam ch serviceAccount:{serviceAccount}:objectViewer,bucketViewer gs://{gcsConfig.bucketName}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {iamStatus === 'unchecked' && (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Shield className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Click below to verify IAM permissions</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center space-x-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Back to Configuration</span>
            </button>
            
            <div className="flex items-center space-x-3">
              {iamStatus !== 'valid' && (
                <button
                  onClick={checkIamPermissions}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  disabled={iamStatus === 'checking'}
                >
                  {iamStatus === 'checking' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>Verify Permissions</span>
                    </>
                  )}
                </button>
              )}
              
              {iamStatus === 'valid' && (
                <button
                  onClick={() => {
                    setCurrentStep(3);
                    setMaxStepReached(Math.max(maxStepReached, 3));
                  }}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <span>Continue to Table Discovery</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-1">Need help with IAM setup?</p>
              <p className="text-blue-700">
                For fine-grained permissions or folder-level access, apply permissions to individual prefixes as needed.
                If access is already granted for a parent prefix or bucket, no further changes are required.
              </p>
              <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">
                View detailed IAM setup guide →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}