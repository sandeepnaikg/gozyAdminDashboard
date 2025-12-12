import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import {
  type RbacContext as RbacContextType,
  VendorEmployee,
  RbacRole,
  NavigationAccess,
  ServicePermissionConfig,
  PermissionType,
  ServiceType,
} from '@/types/rbac';

const RbacContext = createContext<RbacContextType | null>(null);

interface RbacProviderProps {
  children: ReactNode;
}

export function RbacProvider({ children }: RbacProviderProps) {
  const [currentEmployee, setCurrentEmployee] = useState<VendorEmployee | null>(null);
  const [currentRole, setCurrentRole] = useState<RbacRole | null>(null);
  const [permissions, setPermissions] = useState<NavigationAccess>({ features: [] });
  const [servicePermissions, setServicePermissions] = useState<ServicePermissionConfig[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    loadPermissionsFromStorage();
  }, []);

  const loadPermissionsFromStorage = () => {
    try {
      const navigationAccess = localStorage.getItem('navigationAccess');
      const servicePerms = localStorage.getItem('servicePermissions');

      if (navigationAccess) {
        setPermissions(JSON.parse(navigationAccess));
      }

      if (servicePerms) {
        setServicePermissions(JSON.parse(servicePerms));
      }
    } catch (error) {
      console.error('Error loading permissions:', error);
    }
  };

  const hasPermission = (featureKey: string, permissionType: PermissionType): boolean => {
    const feature = permissions.features.find((f) => f.key === featureKey);
    
    if (!feature) return false;

    switch (permissionType) {
      case 'view':
        return feature.canView;
      case 'edit':
        return feature.canEdit;
      case 'delete':
        return feature.canDelete;
      default:
        return false;
    }
  };

  const hasServicePermission = (
    serviceType: ServiceType,
    permissionType: PermissionType
  ): boolean => {
    const permission = servicePermissions.find(
      (p) => p.service_type === serviceType
    );

    if (!permission) return false;

    switch (permissionType) {
      case 'view':
        return permission.can_view;
      case 'edit':
        return permission.can_edit;
      case 'delete':
        return permission.can_delete;
      case 'approve':
        return permission.can_approve || false;
      default:
        return false;
    }
  };

  const contextValue: RbacContextType = {
    currentEmployee: currentEmployee || undefined,
    currentRole: currentRole || undefined,
    permissions,
    servicePermissions,
    hasPermission,
    hasServicePermission,
  };

  return (
    <RbacContext.Provider value={contextValue}>
      {children}
    </RbacContext.Provider>
  );
}

export function useRbac(): RbacContextType {
  const context = useContext(RbacContext);
  
  if (!context) {
    throw new Error('useRbac must be used within RbacProvider');
  }

  return context;
}

// Helper hook for permission-based rendering
export function usePermission(featureKey: string) {
  const { hasPermission } = useRbac();

  return {
    canView: hasPermission(featureKey, 'view'),
    canEdit: hasPermission(featureKey, 'edit'),
    canDelete: hasPermission(featureKey, 'delete'),
  };
}

// Helper hook for service permission-based rendering
export function useServicePermission(serviceType: ServiceType) {
  const { hasServicePermission } = useRbac();

  return {
    canView: hasServicePermission(serviceType, 'view'),
    canEdit: hasServicePermission(serviceType, 'edit'),
    canDelete: hasServicePermission(serviceType, 'delete'),
    canApprove: hasServicePermission(serviceType, 'approve'),
  };
}
