// =====================================================
// VENDOR EMPLOYEE & RBAC GRAPHQL QUERIES
// =====================================================

// =====================================================
// EMPLOYEE QUERIES
// =====================================================

export const GET_VENDOR_EMPLOYEES = `
  query GetVendorEmployees($vendorAccountId: uuid!) {
    vendor_employee_accounts(
      where: { vendor_account_id: { _eq: $vendorAccountId } }
      order_by: { created_at: desc }
    ) {
      id
      email
      name
      phone
      is_active
      last_login_at
      created_at
      user_mapping {
        id
        role {
          id
          role_key
          display_name
          description
        }
        redact
        navigation_access
        service_permissions
      }
    }
  }
`;

export const GET_EMPLOYEE_DETAILS = `
  query GetEmployeeDetails($employeeId: uuid!) {
    vendor_employee_accounts_by_pk(id: $employeeId) {
      id
      vendor_account_id
      email
      name
      phone
      is_active
      last_login_at
      created_at
      updated_at
      vendor_account {
        id
        email
        vendor_profile {
          business_name
        }
      }
      user_mapping {
        id
        role_id
        redact
        navigation_access
        service_permissions
        custom_permissions
        role {
          id
          role_key
          display_name
          description
        }
      }
      service_permissions {
        id
        service_type
        can_view
        can_edit
        can_delete
        can_approve
      }
    }
  }
`;

export const GET_EMPLOYEE_PERMISSIONS_SUMMARY = `
  query GetEmployeePermissionsSummary($vendorAccountId: uuid!) {
    v_employee_permissions_summary(
      where: { vendor_account_id: { _eq: $vendorAccountId } }
      order_by: { email: asc }
    ) {
      employee_id
      email
      name
      role_key
      role_name
      feature_count
      editable_features
      service_count
      editable_services
      is_active
    }
  }
`;

// =====================================================
// ROLE QUERIES
// =====================================================

export const GET_RBAC_ROLES = `
  query GetRbacRoles($vendorAccountId: uuid) {
    rbac_roles(
      where: {
        _or: [
          { vendor_account_id: { _eq: $vendorAccountId } }
          { is_system: { _eq: true } }
        ]
        is_active: { _eq: true }
      }
      order_by: { display_name: asc }
    ) {
      id
      role_key
      display_name
      description
      is_system
      created_at
    }
  }
`;

export const GET_ROLE_FEATURES = `
  query GetRoleFeatures($roleId: uuid!) {
    rbac_role_features(
      where: { role_id: { _eq: $roleId } }
    ) {
      id
      feature {
        id
        feature_key
        label
        description
        route
        icon
      }
      can_view
      can_edit
      can_delete
    }
  }
`;

// =====================================================
// FEATURE QUERIES
// =====================================================

export const GET_APP_FEATURES = `
  query GetAppFeatures {
    app_features(
      where: { is_active: { _eq: true } }
      order_by: { sort_order: asc }
    ) {
      id
      feature_key
      label
      description
      route
      icon
      parent_key
      sort_order
    }
  }
`;

// =====================================================
// AUDIT LOG QUERIES
// =====================================================

export const GET_EMPLOYEE_AUDIT_TRAIL = `
  query GetEmployeeAuditTrail($vendorAccountId: uuid!, $limit: Int = 50) {
    v_employee_audit_trail(
      where: { vendor_account_id: { _eq: $vendorAccountId } }
      order_by: { created_at: desc }
      limit: $limit
    ) {
      audit_id
      created_at
      action
      resource_type
      actor_name
      actor_email
      target_name
      target_email
      payload
      vendor_name
    }
  }
`;

export const GET_AUDIT_LOGS_BY_EMPLOYEE = `
  query GetAuditLogsByEmployee($employeeId: uuid!, $limit: Int = 20) {
    rbac_audit_logs(
      where: {
        _or: [
          { actor_employee_id: { _eq: $employeeId } }
          { target_employee_id: { _eq: $employeeId } }
        ]
      }
      order_by: { created_at: desc }
      limit: $limit
    ) {
      id
      action
      resource_type
      resource_id
      payload
      ip_address
      created_at
      actor_employee {
        name
        email
      }
      target_employee {
        name
        email
      }
    }
  }
`;

// =====================================================
// SERVICE PERMISSION QUERIES
// =====================================================

export const GET_EMPLOYEE_SERVICE_PERMISSIONS = `
  query GetEmployeeServicePermissions($employeeId: uuid!) {
    vendor_employee_service_permissions(
      where: { vendor_employee_id: { _eq: $employeeId } }
      order_by: { service_type: asc }
    ) {
      id
      service_type
      can_view
      can_edit
      can_delete
      can_approve
      created_at
      updated_at
    }
  }
`;

// =====================================================
// MUTATIONS
// =====================================================

export const CREATE_VENDOR_EMPLOYEE = `
  mutation CreateVendorEmployee(
    $vendorAccountId: uuid!
    $email: String!
    $name: String!
    $phone: String
    $passwordHash: String!
  ) {
    insert_vendor_employee_accounts_one(
      object: {
        vendor_account_id: $vendorAccountId
        email: $email
        name: $name
        phone: $phone
        password_hash: $passwordHash
        is_active: true
      }
    ) {
      id
      email
      name
      created_at
    }
  }
`;

export const UPDATE_VENDOR_EMPLOYEE = `
  mutation UpdateVendorEmployee(
    $employeeId: uuid!
    $email: String
    $name: String
    $phone: String
    $isActive: Boolean
  ) {
    update_vendor_employee_accounts_by_pk(
      pk_columns: { id: $employeeId }
      _set: {
        email: $email
        name: $name
        phone: $phone
        is_active: $isActive
      }
    ) {
      id
      email
      name
      phone
      is_active
      updated_at
    }
  }
`;

export const DELETE_VENDOR_EMPLOYEE = `
  mutation DeleteVendorEmployee($employeeId: uuid!) {
    delete_vendor_employee_accounts_by_pk(id: $employeeId) {
      id
      email
    }
  }
`;

export const ASSIGN_EMPLOYEE_ROLE = `
  mutation AssignEmployeeRole(
    $employeeId: uuid!
    $roleId: uuid!
    $vendorAccountId: uuid!
    $navigationAccess: jsonb
  ) {
    insert_rbac_user_mapping_one(
      object: {
        vendor_employee_id: $employeeId
        role_id: $roleId
        account_admin_id: $vendorAccountId
        navigation_access: $navigationAccess
      }
      on_conflict: {
        constraint: rbac_user_mapping_vendor_employee_id_key
        update_columns: [role_id, navigation_access, updated_at]
      }
    ) {
      id
      vendor_employee_id
      role_id
      navigation_access
    }
  }
`;

export const UPDATE_EMPLOYEE_PERMISSIONS = `
  mutation UpdateEmployeePermissions(
    $employeeId: uuid!
    $redact: Boolean
    $navigationAccess: jsonb
    $servicePermissions: jsonb
    $customPermissions: jsonb
  ) {
    update_rbac_user_mapping(
      where: { vendor_employee_id: { _eq: $employeeId } }
      _set: {
        redact: $redact
        navigation_access: $navigationAccess
        service_permissions: $servicePermissions
        custom_permissions: $customPermissions
      }
    ) {
      affected_rows
      returning {
        id
        redact
        navigation_access
        service_permissions
        custom_permissions
      }
    }
  }
`;

export const GRANT_SERVICE_PERMISSION = `
  mutation GrantServicePermission(
    $employeeId: uuid!
    $serviceType: String!
    $canView: Boolean!
    $canEdit: Boolean!
    $canDelete: Boolean!
    $canApprove: Boolean!
  ) {
    insert_vendor_employee_service_permissions_one(
      object: {
        vendor_employee_id: $employeeId
        service_type: $serviceType
        can_view: $canView
        can_edit: $canEdit
        can_delete: $canDelete
        can_approve: $canApprove
      }
      on_conflict: {
        constraint: vendor_employee_service_permissions_vendor_employee_id_ser
        update_columns: [can_view, can_edit, can_delete, can_approve, updated_at]
      }
    ) {
      id
      service_type
      can_view
      can_edit
      can_delete
      can_approve
    }
  }
`;

export const REVOKE_SERVICE_PERMISSION = `
  mutation RevokeServicePermission($employeeId: uuid!, $serviceType: String!) {
    delete_vendor_employee_service_permissions(
      where: {
        vendor_employee_id: { _eq: $employeeId }
        service_type: { _eq: $serviceType }
      }
    ) {
      affected_rows
    }
  }
`;

export const CREATE_ROLE = `
  mutation CreateRole(
    $vendorAccountId: uuid
    $roleKey: String!
    $displayName: String!
    $description: String
  ) {
    insert_rbac_roles_one(
      object: {
        vendor_account_id: $vendorAccountId
        role_key: $roleKey
        display_name: $displayName
        description: $description
        is_system: false
        is_active: true
      }
    ) {
      id
      role_key
      display_name
      description
      created_at
    }
  }
`;

export const ASSIGN_ROLE_FEATURES = `
  mutation AssignRoleFeatures($objects: [rbac_role_features_insert_input!]!) {
    insert_rbac_role_features(
      objects: $objects
      on_conflict: {
        constraint: rbac_role_features_role_id_feature_id_key
        update_columns: [can_view, can_edit, can_delete]
      }
    ) {
      affected_rows
      returning {
        id
        role_id
        feature_id
        can_view
        can_edit
        can_delete
      }
    }
  }
`;

export const LOG_AUDIT_ENTRY = `
  mutation LogAuditEntry(
    $vendorAccountId: uuid!
    $actorEmployeeId: uuid
    $targetEmployeeId: uuid
    $action: String!
    $resourceType: String
    $resourceId: uuid
    $payload: jsonb
    $ipAddress: String
    $userAgent: String
  ) {
    insert_rbac_audit_logs_one(
      object: {
        vendor_account_id: $vendorAccountId
        actor_employee_id: $actorEmployeeId
        target_employee_id: $targetEmployeeId
        action: $action
        resource_type: $resourceType
        resource_id: $resourceId
        payload: $payload
        ip_address: $ipAddress
        user_agent: $userAgent
      }
    ) {
      id
      created_at
    }
  }
`;
