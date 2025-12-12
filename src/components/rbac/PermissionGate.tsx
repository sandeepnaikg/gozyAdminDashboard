import { ReactNode } from 'react';
import { useRbac } from '@/hooks/useRbac';
import { PermissionType, ServiceType } from '@/types/rbac';

interface PermissionGateProps {
  children: ReactNode;
  featureKey?: string;
  serviceType?: ServiceType;
  permission: PermissionType;
  fallback?: ReactNode;
}

/**
 * PermissionGate Component
 * 
 * Conditionally renders children based on user permissions
 * 
 * Usage:
 * <PermissionGate featureKey="analytics" permission="view">
 *   <AnalyticsContent />
 * </PermissionGate>
 * 
 * <PermissionGate serviceType="hotel" permission="edit">
 *   <EditHotelButton />
 * </PermissionGate>
 */
export function PermissionGate({
  children,
  featureKey,
  serviceType,
  permission,
  fallback = null,
}: PermissionGateProps) {
  const { hasPermission, hasServicePermission } = useRbac();

  let hasAccess = false;

  if (featureKey) {
    hasAccess = hasPermission(featureKey, permission);
  } else if (serviceType) {
    hasAccess = hasServicePermission(serviceType, permission);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

interface RequirePermissionProps {
  featureKey: string;
  permission: PermissionType;
}

/**
 * RequirePermission Component
 * 
 * Page-level permission check with access denied message
 * 
 * Usage:
 * function AnalyticsPage() {
 *   return (
 *     <RequirePermission featureKey="analytics" permission="view">
 *       <AnalyticsContent />
 *     </RequirePermission>
 *   );
 * }
 */
export function RequirePermission({
  featureKey,
  permission,
  children,
}: RequirePermissionProps & { children: ReactNode }) {
  const { hasPermission } = useRbac();

  if (!hasPermission(featureKey, permission)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m10-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to {permission} this feature.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Contact your administrator to request access.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Helper function to check permissions outside components
export function checkPermission(
  featureKey: string,
  permission: PermissionType
): boolean {
  try {
    const navigationAccess = localStorage.getItem('navigationAccess');
    
    if (!navigationAccess) return false;

    const permissions = JSON.parse(navigationAccess);
    const feature = permissions.features.find((f: any) => f.key === featureKey);

    if (!feature) return false;

    switch (permission) {
      case 'view':
        return feature.canView;
      case 'edit':
        return feature.canEdit;
      case 'delete':
        return feature.canDelete;
      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
}

// Helper function to check service permissions
export function checkServicePermission(
  serviceType: ServiceType,
  permission: PermissionType
): boolean {
  try {
    const servicePerms = localStorage.getItem('servicePermissions');
    
    if (!servicePerms) return false;

    const permissions = JSON.parse(servicePerms);
    const servicePerm = permissions.find(
      (p: any) => p.service_type === serviceType
    );

    if (!servicePerm) return false;

    switch (permission) {
      case 'view':
        return servicePerm.can_view;
      case 'edit':
        return servicePerm.can_edit;
      case 'delete':
        return servicePerm.can_delete;
      case 'approve':
        return servicePerm.can_approve || false;
      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking service permission:', error);
    return false;
  }
}
