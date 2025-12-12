// =====================================================
// RBAC & Vendor Employee Management Types
// =====================================================

export interface VendorEmployee {
  id: string;
  vendor_account_id: string;
  email: string;
  name: string;
  phone?: string;
  password_hash?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  user_mapping?: RbacUserMapping;
  service_permissions?: EmployeeServicePermission[];
  vendor_account?: {
    id: string;
    email: string;
    vendor_profile?: {
      business_name: string;
    };
  };
}

export interface RbacRole {
  id: string;
  vendor_account_id?: string;
  role_key: string;
  display_name: string;
  description?: string;
  is_system: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role_features?: RoleFeature[];
}

export interface AppFeature {
  id: string;
  feature_key: string;
  label: string;
  description?: string;
  route: string;
  icon?: string;
  parent_key?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface RoleFeature {
  id: string;
  role_id: string;
  feature_id: string;
  feature?: AppFeature;
  can_view: boolean;
  can_edit: boolean;
  can_delete: boolean;
  created_at: string;
}

export interface RbacUserMapping {
  id: string;
  vendor_employee_id: string;
  account_admin_id?: string;
  role_id?: string;
  role?: RbacRole;
  redact: boolean;
  navigation_access: NavigationAccess;
  service_permissions: ServicePermissionConfig[];
  custom_permissions?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface NavigationAccess {
  features: NavigationFeature[];
}

export interface NavigationFeature {
  key: string;
  label: string;
  route: string;
  icon?: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface EmployeeServicePermission {
  id: string;
  vendor_employee_id: string;
  service_type: string;
  can_view: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_approve: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServicePermissionConfig {
  service_type: string;
  can_view: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_approve?: boolean;
}

export interface RbacAuditLog {
  id: string;
  vendor_account_id: string;
  actor_employee_id?: string;
  target_employee_id?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  payload?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  actor_employee?: {
    name: string;
    email: string;
  };
  target_employee?: {
    name: string;
    email: string;
  };
}

export interface EmployeePermissionsSummary {
  employee_id: string;
  email: string;
  name: string;
  vendor_account_id: string;
  role_key?: string;
  role_name?: string;
  feature_count: number;
  editable_features: number;
  service_count: number;
  editable_services: number;
  is_active: boolean;
}

// Service types enum
export enum ServiceType {
  HOTEL = 'hotel',
  FLIGHT = 'flight',
  TRAIN = 'train',
  METRO = 'metro',
  MOVIE = 'movie',
  FOOD = 'food',
  DELIVERY = 'delivery',
}

// Permission types
export type PermissionType = 'view' | 'edit' | 'delete' | 'approve';

// Audit action types
export enum AuditAction {
  CREATE_EMPLOYEE = 'create_employee',
  UPDATE_EMPLOYEE = 'update_employee',
  DELETE_EMPLOYEE = 'delete_employee',
  ASSIGN_ROLE = 'assign_role',
  UPDATE_NAVIGATION = 'update_navigation',
  GRANT_PERMISSION = 'grant_permission',
  REVOKE_PERMISSION = 'revoke_permission',
  GRANT_SERVICE_PERMISSION = 'grant_service_permission',
  REVOKE_SERVICE_PERMISSION = 'revoke_service_permission',
  LOGIN = 'login',
  LOGOUT = 'logout',
}

// Form types for creating/editing employees
export interface CreateEmployeeForm {
  email: string;
  name: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role_id?: string;
  is_active: boolean;
}

export interface UpdateEmployeeForm {
  email?: string;
  name?: string;
  phone?: string;
  is_active?: boolean;
}

export interface AssignRoleForm {
  employee_id: string;
  role_id: string;
  vendor_account_id: string;
}

export interface GrantServicePermissionForm {
  employee_id: string;
  service_type: ServiceType;
  can_view: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_approve: boolean;
}

// Context for RBAC
export interface RbacContext {
  currentEmployee?: VendorEmployee;
  currentRole?: RbacRole;
  permissions: NavigationAccess;
  servicePermissions: ServicePermissionConfig[];
  hasPermission: (featureKey: string, permissionType: PermissionType) => boolean;
  hasServicePermission: (serviceType: ServiceType, permissionType: PermissionType) => boolean;
}
