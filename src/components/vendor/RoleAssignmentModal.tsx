import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RbacRole, VendorEmployee } from '@/types/rbac';
import { Shield, Check } from 'lucide-react';

interface RoleAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (employeeId: string, roleId: string) => void;
  employee: VendorEmployee;
  roles: RbacRole[];
}

export default function RoleAssignmentModal({
  isOpen,
  onClose,
  onAssign,
  employee,
  roles,
}: RoleAssignmentModalProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    employee.user_mapping?.role_id || ''
  );

  const handleSubmit = () => {
    if (selectedRoleId) {
      onAssign(employee.id, selectedRoleId);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Role">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Assigning role to:</p>
          <p className="font-medium text-gray-900">{employee.name}</p>
          <p className="text-sm text-gray-600">{employee.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <div className="space-y-2">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-all
                  ${
                    selectedRoleId === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        ${
                          selectedRoleId === role.id
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                        }
                      `}
                    >
                      {selectedRoleId === role.id ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Shield className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          {role.display_name}
                        </p>
                        {role.is_system && (
                          <Badge variant="secondary" className="text-xs">
                            System
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {role.description || 'No description'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Key: {role.role_key}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRoleId && (
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Assigning a role will grant the employee access to
              features and services defined in the role configuration.
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedRoleId}
          >
            Assign Role
          </Button>
        </div>
      </div>
    </Modal>
  );
}
