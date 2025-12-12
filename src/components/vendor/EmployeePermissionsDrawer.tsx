import { useState, useEffect } from 'react';
import { X, Shield, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { VendorEmployee, AppFeature, ServiceType } from '@/types/rbac';
import { graphqlRequest } from '@/lib/apolloClient';
import {
  GET_EMPLOYEE_SERVICE_PERMISSIONS,
  GRANT_SERVICE_PERMISSION,
  UPDATE_EMPLOYEE_PERMISSIONS,
} from '@/graphql/queries/rbac';

interface EmployeePermissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  employee: VendorEmployee;
  features: AppFeature[];
  onUpdate: () => void;
}

const SERVICE_TYPES = [
  { key: ServiceType.HOTEL, label: 'Hotels', icon: '🏨' },
  { key: ServiceType.FLIGHT, label: 'Flights', icon: '✈️' },
  { key: ServiceType.TRAIN, label: 'Trains', icon: '🚂' },
  { key: ServiceType.METRO, label: 'Metro', icon: '🚇' },
  { key: ServiceType.MOVIE, label: 'Movies', icon: '🎬' },
  { key: ServiceType.FOOD, label: 'Food Delivery', icon: '🍔' },
  { key: ServiceType.DELIVERY, label: 'Delivery', icon: '📦' },
];

export default function EmployeePermissionsDrawer({
  isOpen,
  onClose,
  employee,
  features,
  onUpdate,
}: EmployeePermissionsDrawerProps) {
  const [servicePermissions, setServicePermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'service' | 'data'>('service');
  const [redactPII, setRedactPII] = useState(employee.user_mapping?.redact || false);

  useEffect(() => {
    if (isOpen && employee) {
      fetchServicePermissions();
      setRedactPII(employee.user_mapping?.redact || false);
    }
  }, [isOpen, employee]);

  const fetchServicePermissions = async () => {
    try {
      const response = await graphqlRequest({
        query: GET_EMPLOYEE_SERVICE_PERMISSIONS,
        variables: { employeeId: employee.id },
      });

      if (response.data) {
        setServicePermissions(response.data.vendor_employee_service_permissions || []);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleServicePermissionChange = async (
    serviceType: string,
    permission: string,
    value: boolean
  ) => {
    try {
      const existingPerm = servicePermissions.find(
        (p) => p.service_type === serviceType
      );

      const updatedPerm = {
        can_view: existingPerm?.can_view || false,
        can_edit: existingPerm?.can_edit || false,
        can_delete: existingPerm?.can_delete || false,
        can_approve: existingPerm?.can_approve || false,
        [permission]: value,
      };

      await graphqlRequest({
        query: GRANT_SERVICE_PERMISSION,
        variables: {
          employeeId: employee.id,
          serviceType,
          ...updatedPerm,
        },
      });

      // Refresh permissions
      await fetchServicePermissions();
      onUpdate();
    } catch (error) {
      console.error('Error updating permission:', error);
      alert('Failed to update permission');
    }
  };

  const handleRedactToggle = async () => {
    try {
      await graphqlRequest({
        query: UPDATE_EMPLOYEE_PERMISSIONS,
        variables: {
          employeeId: employee.id,
          redact: !redactPII,
          navigationAccess: employee.user_mapping?.navigation_access,
          servicePermissions: employee.user_mapping?.service_permissions,
          customPermissions: employee.user_mapping?.custom_permissions,
        },
      });

      setRedactPII(!redactPII);
      onUpdate();
    } catch (error) {
      console.error('Error updating redact setting:', error);
      alert('Failed to update setting');
    }
  };

  const getPermission = (serviceType: string, permission: string): boolean => {
    const perm = servicePermissions.find((p) => p.service_type === serviceType);
    return perm ? perm[permission] : false;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Manage Permissions</h2>
            <p className="text-sm text-gray-600 mt-1">
              {employee.name} • {employee.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Employee Info */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {employee.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{employee.name}</p>
              <p className="text-sm text-gray-600">{employee.email}</p>
              {employee.user_mapping?.role && (
                <Badge variant="default" className="mt-1">
                  {employee.user_mapping.role.display_name}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex p-6 gap-4">
            <button
              onClick={() => setActiveTab('service')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  activeTab === 'service'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              Service Permissions
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  activeTab === 'data'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              Data Access
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'service' && (
            <>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Service-Level Permissions</p>
                  <p className="mt-1">
                    Control which services this employee can access and what actions
                    they can perform on each service type.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {SERVICE_TYPES.map((service) => (
                  <div
                    key={service.key}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{service.label}</p>
                        <p className="text-xs text-gray-500">{service.key}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {['can_view', 'can_edit', 'can_delete', 'can_approve'].map(
                        (perm) => (
                          <label
                            key={perm}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={getPermission(service.key, perm)}
                              onChange={(e) =>
                                handleServicePermissionChange(
                                  service.key,
                                  perm,
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                              {perm.replace('can_', '').replace('_', ' ')}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'data' && (
            <>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Data Privacy Controls</p>
                  <p className="mt-1">
                    Configure how sensitive customer data is displayed to this
                    employee.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Redact PII Data</p>
                    <p className="text-sm text-gray-600 mt-1">
                      When enabled, personally identifiable information (email,
                      phone, address) will be masked in the UI for this employee.
                    </p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>• Email: j***@example.com</p>
                      <p>• Phone: +1 *** *** **90</p>
                      <p>• Address: 123 **** St, ****</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRedactToggle}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full
                      transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${redactPII ? 'bg-blue-600' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${redactPII ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-3">
                  Current Role Features
                </p>
                {employee.user_mapping?.role ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Assigned Role:</span>
                      <Badge variant="default">
                        {employee.user_mapping.role.display_name}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {employee.user_mapping.role.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No role assigned</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </div>
    </>
  );
}
